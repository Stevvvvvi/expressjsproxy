const express = require('express')
const axios = require('axios');
var cors = require('cors')


const app = express()
const port = 4000

//middleware
app.use(cors())

app.get('/',async (req, res)  => {
    const url = req.query?.url || "";
    const apiKey = req.header('x-api-key') || ""
    let responseValue={};
    try {
        const response = await axios.get(url, {headers:{"x-api-key": apiKey}});
        responseValue = response.data
        //console.log(responseValue);
      } catch (error) {
        console.error(error);
        responseValue=error;
    }
    
    res.send(responseValue)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})