const express = require('express')
const bodyparser = require('body-parser');
const fs = require('fs');
global.service = {
    name:null,
    priority:null,
    issue:null,
    comment:null,
};

const app = express()

const port = process.env.PORT || 3000

app.use(
    bodyparser.urlencoded({
        extended: false
    })
);
app.use(
    bodyparser.json()
);

app.post('/reg', function (req, res) {
    
       /*let data = JSON.stringify( req.body.result.parameters, null, 2);
       
       fs.writeFile('service.json', data, (err) => {  
        if (err) throw err;
        console.log('Data written to file');
    });*/

    service.name =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.name;

    service.issue = req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.issue;

    service.priority = service.issue = req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.priority;

    service.comment = service.issue = req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.comment;

    return res.json({
        speech: "Thank you",
        displayText: "Done Ticket raised !!",
        source:"dasd"

    });


}

)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))