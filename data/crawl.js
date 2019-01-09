const api = require('./api');
const axios = require('axios');

const {
    MIDFIDER_URL,
    apiBuilder
} = api;

const url = apiBuilder({
    category: "tackles",
    sortBy: "tackleWonTotal",
    age: 28,
    appearances: 9,
    positionOptions: "%27AML%27,%27AMC%27,%27AMR%27,%27ML%27,%27MC%27,%27MR%27,%27DMC%27",
    page: 2
})

console.log(url);

axios.get(MIDFIDER_URL).then((result) => {
    console.log(result.data);
}).catch((err) => {

});