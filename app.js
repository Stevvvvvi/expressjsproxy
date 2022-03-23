const express = require('express')
const axios = require('axios');
var cors = require('cors')


const app = express()
const port = 4000

//middleware
app.use(cors())

app.get('/',async (req, res)  => {
    const url = req.query?.url || "";
    console.log(url)
    const apiKey = req.header('x-api-key') || ""
    let responseValue={};
    let status = 200;
    try {
        const response = await axios.get(url, apiKey =="" ? {} : {headers:{"x-api-key": apiKey}});
        responseValue = response.data
        //console.log(responseValue);
      } catch (error) {
        console.error(error);
        status=400;
        responseValue=error;
    }
    
    res.status(status).send(responseValue)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})