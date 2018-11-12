const express = require('express')
const bodyparser = require('body-parser');
const fs = require('fs');
var service ={
    
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
    if(req.body.result.metadata.intentName == "Service_Ticket")
    {
        service.tickets.name.push(req.body.result &&
            req.body.result.parameters &&
            req.body.result.parameters.name);
        
    
    service.tickets.issue.push(req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.issue);

    service.tickets.priority.push( 
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.priority);

    service.tickets.comment.push(  
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.comment);
    if(req.body.result.metadata.intentName == "Service_Ticket")
    {
        if (service.tickets.name[service.tickets.name - 1] == "") {
            return res.json({
                speech: "Can i Know Your name ??",
                displayText: "Can i Know Your name",
                source:"google"
    
            });

        } else if (service.tickets.issue[service.tickets.issue - 1]== "") {
            return res.json({
                speech: "What is the issue ?",
                displayText: "What is the issue ?",
                source:"google"
        
            });

        } else if (service.tickets.priority[service.tickets.priority -1]== "") {
            return res.json({
                speech: "Can you tell me the priority of the issue ?",
                displayText: "Can you tell me the priority of the issue ?",
                source:"google"
        
            });

        } else if ( service.tickets.comment[service.tickets.comment -1]== "") {
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
            
            "speech": "this text is spoken out loud if the platform supports voice interactions",
            "displayText": "this text is displayed visually",
            "data":{
                "google": {
                    "expectedUserResponse":true,
                    "richResponse" : {
                        "items" : [
                            {
                                "simpleResponse" : {
                                    "textToSpeech": "Your issues are listed below"
                                }
                            },
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
      
            

}

},
)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))