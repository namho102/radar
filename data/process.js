const fs = require('fs');

function readJSON(fileName) {
    return new Promise(function(resolve, reject) {
        fs.readFile(fileName, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            };
            resolve(JSON.parse(data).playerTableStats);
        });
    })
};

function readCategory(category) {
    const fileList = [];
    for (let i = 1; i <= 20; i++) {
        fileList.push(`${category}/data (${i}).json`);
    }
    return new Promise(function(resolve, reject) {
        Promise.all(fileList.map(readJSON)).then(function(value) {
            resolve([].concat.apply([], value));
        });
    })
}

function setPlayerStats(playerStats, categoryStat) {
    for (let playerStat of categoryStat) {
        if(!playerStats[playerStat.name]) {
            playerStats[playerStat.name] = {}
        }
    }

    for (let playerStat of categoryStat) {
        const stat = playerStats[playerStat.name];
        playerStats[playerStat.name] = {...stat, ...playerStat};
    }
}

async function process() {
    const dribbles = await readCategory("dribbles");
    const interceptions = await readCategory("interceptions");
    const keypasses = await readCategory("keypasses");
    const tackles = await readCategory("tackles");

    const playerNameSet = new Set();
    for (let playerStat of dribbles) {
        playerNameSet.add(playerStat.name)
    }
    for (let playerStat of interceptions) {
        playerNameSet.add(playerStat.name)
    }
    for (let playerStat of keypasses) {
        playerNameSet.add(playerStat.name)
    }
    for (let playerStat of tackles) {
        playerNameSet.add(playerStat.name)
    }

    const playerNames = Array.from(playerNameSet);

    const playerStats = {};

    setPlayerStats(playerStats, dribbles);
    setPlayerStats(playerStats, interceptions);
    setPlayerStats(playerStats, keypasses);
    setPlayerStats(playerStats, tackles);

    const playerStatsList = [];
    for(let playerName of playerNames) {
        const playerStat = playerStats[playerName];
        // playerStatsList.push({
        //     playerName,
        //     dribbles: playerStat.dribbleWon || 0,
        //     interceptions: playerStat.interceptionAll || 0,
        //     tackles: playerStat.tackleWonTotal || 0,
        //     keyPasses: playerStat.keyPassesTotal || 0

        // })
        if(playerStat.dribbleWon &&
            playerStat.interceptionAll &&
            playerStat.tackleWonTotal &&
            playerStat.keyPassesTotal) {

            playerStatsList.push({
                playerName,
                dribbles: playerStat.dribbleWon,
                interceptions: playerStat.interceptionAll,
                tackles: playerStat.tackleWonTotal,
                keyPasses: playerStat.keyPassesTotal
            })
        }
    }
    // console.log(playerStatsList);

    const json = JSON.stringify({ playerStatsList });

    fs.writeFileSync('playerStatsList_positive.json', json, 'utf8');
}

process();