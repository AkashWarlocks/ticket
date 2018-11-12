const express = require('express')
const bodyparser = require('body-parser');
const fs = require('fs');
global.service =
{
    "tickets": [
        {
            "name":null,
            "priority":null,
            "issue":null,
            "comment":null,
            "id":null
        }

    ]
}
    

 ;

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
    if(req.body.metadata.intentName == "Service_Ticket")
    {
        service.name =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.name;    
    
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
            displayText: "Can i Know Your name",
            source:"google"
    
        });

    } else if ((service.issue)== "") {
        return res.json({
            speech: "What is the issue ?",
            displayText: "What is the issue ?",
            source:"google"
    
        });

    } else if ((service.priority)== "") {
        return res.json({
            speech: "Can you tell me the priority of the issue ?",
            displayText: "Can you tell me the priority of the issue ?",
            source:"google"
    
        });

    } else if ((service.comment)== "") {
        return res.json({
            speech: "Please give extra information about the incident ",
            displayText: "Please give extra information about the incident ",
            source:"google"
    
        });

    } else {
        service.id = Math.floor(Math.random() * 100) + 1;
        return res.json({

            "speech": "this text is spoken out loud if the platform supports voice interactions",
            "displayText": "this text is displayed visually",

            "data":{
                "google": {
                    "expectedUserResponse":true,
                    "richResponse" : {
                        "items" : [
                            {
                                "simpleResponse" : {
                                    "textToSpeech":"Service ticket raised successfully. Here is your TICKET"
                                }
                            },
                            {
                                "basicCard": {
            
                                    "title": "SERVICE TICKET",
                                    "subtitle": "ISSUE " +service.issue +" \n  ID - " +service.id,
                                    "formattedText": "Priority "+service.priority
                                        
                                  },
                            }
                        ]
                    }
                   
                }

            },
            "contextOut": [
                {
                  "name": "_actions_on_google",
                  "lifespan": 99,
                  "parameters": {
                    "data": "{}"
                  }
                }
              ]

            
            });
        }
    
    } else {
        return res.json({
            speech: "This are your Issues",
            displayText: "ISSUES RAISED UPTIL NOW - ",
            source:"google"
        });

    }
      
            

}

)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))