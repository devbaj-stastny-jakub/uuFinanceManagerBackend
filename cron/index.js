const axios = require("axios");

function ping() {
    axios.get("https://test-bifj.onrender.com").then(val => {
        console.log(val.data)
    })
    axios.get("https://database-service-c362.onrender.com").then(val => {
        console.log(val.data)
    })
}
ping()
