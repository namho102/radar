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

function getFileList(category) {
    const fileList = [];
    for (let i = 1; i <= 20; i++) {
        fileList.push(`${category}/data (${i}).json`);
    }
    return fileList;
}

function readCategory(category) {
    return new Promise(function(resolve, reject) {
        Promise.all(getFileList("dribbles").map(readJSON)).then(function(value) {
            resolve([].concat.apply([], value));
        });
    })
}

async function process() {
    const dribbleStat = await readCategory("dribbles");
    console.log(dribbleStat);
}

process();