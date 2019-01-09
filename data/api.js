exports.MIDFIDER_URL = "https://www.whoscored.com/StatisticsFeed/1/GetPlayerStatistics?category=tackles&subcategory=success&statsAccumulationType=1&isCurrent=true&playerId=&teamIds=&matchId=&stageId=&tournamentOptions=2,3,4,5,22&sortBy=tackleWonTotal&sortAscending=false&age=28&ageComparisonType=3&appearances=9&appearancesComparisonType=2&field=&nationality=&positionOptions=%27AML%27,%27AMC%27,%27AMR%27,%27ML%27,%27MC%27,%27MR%27,%27DMC%27&timeOfTheGameEnd=5&timeOfTheGameStart=0&isMinApp=&page=1&includeZeroValues=&numberOfPlayersToPick=10";

exports.apiBuilder = function (option) {
    const {
        category = "",
            sortBy = "",
            age = "",
            appearances = "",
            positionOptions = "",
            page = ""
    } = option;

    return `https://www.whoscored.com/StatisticsFeed/1/GetPlayerStatistics?category=${category}&subcategory=success&statsAccumulationType=1&isCurrent=true&playerId=&teamIds=&matchId=&stageId=&tournamentOptions=2,3,4,5,22&sortBy=${sortBy}&sortAscending=false&age=${age}&ageComparisonType=3&appearances=${appearances}&appearancesComparisonType=2&field=&nationality=&positionOptions=${positionOptions}&timeOfTheGameEnd=5&timeOfTheGameStart=0&isMinApp=&page=${page}&includeZeroValues=&numberOfPlayersToPick=10`
}