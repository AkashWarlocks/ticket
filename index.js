const express = require('express')
const bodyparser = require('body-parser');
const fs = require('fs');
/*var ticket = [
    {
        "name":
        "priority":
        "issue":
        "comment"
        "id"
    }
]*/


var service = []     

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
        
    if(req.body.result.metadata.intentName == "Service_Ticket")
    {
        if (!(req.body.result &&
            req.body.result.parameters &&
            req.body.result.parameters.name)) {
            return res.json({
                speech: "Can i Know Your name ??",
                displayText: "Can i Know Your name",
                source:"google"
    
            });

        } else if (!(req.body.result &&
            req.body.result.parameters &&
            req.body.result.parameters.issue)) {
            return res.json({
                speech: "What is the issue ?",
                displayText: "What is the issue ?",
                source:"google"
        
            });

        } else if (!(req.body.result &&
            req.body.result.parameters &&
            req.body.result.parameters.priority)) {
            return res.json({
                speech: "Can you tell me the priority of the issue ?",
                displayText: "Can you tell me the priority of the issue ?",
                source:"google"
        
            });

        } else if ( !(req.body.result &&
            req.body.result.parameters &&
            req.body.result.parameters.comment)) {
            return res.json({
                speech: "Please give extra information about the incident ",
                displayText: "Please give extra information about the incident ",
                source:"google"
        
            });

        } else {
            var id_ti = Math.floor(Math.random() * 100) + 1;
            var ticket_obj = {
                
                "name": req.body.result &&
                req.body.result.parameters &&
                req.body.result.parameters.name,
                "priority":req.body.result &&
                req.body.result.parameters &&
                req.body.result.parameters.priority,
                "issue":req.body.result &&
                req.body.result.parameters &&
                req.body.result.parameters.issue,
                "comment" :req.body.result &&
                req.body.result.parameters &&
                req.body.result.parameters.comment,
                "id" :id_ti
                
            }
            
            service.push(ticket_obj);
            console.log(service);
           
                    
            return res.json({

                "speech": "Issue raised",
                "displayText": "Issue raised",

                "data":{
                    "google": {
                        "expectedUserResponse":true,
                        "initialResponse" : {
                            "items" : [
                                {
                                    "simpleResponse" : {
                                        "textToSpeech":"Service ticket raised successfully. Here is your TICKET"
                                    }
                                },
                                {
                                    "basicCard": {
                
                                        "title": "SERVICE TICKET ID - " + ticket_obj.id,
                                        "subtitle": "ISSUE " + ticket_obj.issue,
                                        "formattedText": "Priority "+ ticket_obj.priority, 
                                            
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
           if(service.length == 0) {
            return res.json({
            
                "speech": "No tickets raised",
                "displayText": "this text is displayed visually",
                "data":{
                    "google": {
                        "expectedUserResponse":true,
                        "richResponse" : {
                            "items" : [
                                {
                                    "simpleResponse" : {
                                        "textToSpeech": "You have no tickets raised"
                                    }
                                },
                            ]
                        }  
                    }
                },
            });
    

            } else { 
                var resp = []
                var i;
                for (i = 0; i<service.length;i++) {
                    resp.push({
                        "optionInfo": {
                          "key": "first title "
                        },
                        "title": "Service ticket ID - " +service[i].name,
                        "description": "ISSUE - "+service[i].issue,
                      },
                    )
                }
                return res.json({
                
                    "speech": "Raised tickets",
                    "displayText": "this text is displayed visually",
                    "data": {
                        "google": {
                          "expectUserResponse": true,
                          "richResponse": {
                            "items": [
                              {
                                "simpleResponse": {
                                  "textToSpeech": "Choose a item"
                                }
                              }
                            ]
                          },
                          "systemIntent": {
                            "intent": "actions.intent.OPTION",
                            "data": {
                              "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
                              "listSelect": {
                                "title": "Here are your issues",
                                "items": resp
                              }
                            }
                          }
                        }
                      }
                    });
        }
        
    }
      
}


)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))