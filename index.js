const express = require('express')
const bodyparser = require('body-parser');
const fs = require('fs');


const app = express()

const port = process.env.PORT || 3000

app.use(
    bodyparser.urlencoded({
        extended: true
    })
);

app.get('/', function (req, res) {
    
       let data   =JSON.stringify( req.body.result.parameters, null, 2);


}

)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))