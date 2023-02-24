// test the app.js file with server running


const axios = require('axios');


const test=()=>{
    axios.get('http://localhost:3000')
    .then((res)=>{
        console.log(res.data);
        console.log(res.status);
        if(res.status === 200)
        {
            console.log('Test passed');
        }
    })
    .catch((err)=>{
        console.log(err);
    })
}

test();


