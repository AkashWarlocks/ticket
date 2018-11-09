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
    
    console.log("Name is " + service.name);

    service.issue = req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.issue;

    service.priority = 
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.priority;

    service.comment =  
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.comment;

    if (service.name == "") {
        return res.json({
            speech: "Can i Know Your name ??",
            displayText: "Done Ticket raised !!",
            source:"dasd"
    
        });

    } else if ((service.issue)== "") {
        return res.json({
            speech: "What is the issue ?",
            displayText: "Done Ticket raised !!",
            source:"dasd"
    
        });

    } else if ((service.priority)== "") {
        return res.json({
            speech: "Can you tell me the priority of the issue ?",
            displayText: "Done Ticket raised !!",
            source:"dasd"
    
        });

    } else if ((service.comment)== "") {
        return res.json({
            speech: "Please give extra information about the incident ",
            displayText: "Done Ticket raised !!",
            source:"dasd"
    
        });

    } else {
        return res.json({
            "basicCard": {
                
                "title": "SERVICE TICKET",
                "subtitle": "ISSUE " +service.issue,
                "formattedText": "Priority "+service.priority
                
              },
        });
    }
      
            

}

)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))