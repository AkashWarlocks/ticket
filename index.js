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
var id_ti = 0;

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
                source:"google",
                "data": {
                    "google": {
                      "expectUserResponse": true,
                      "richResponse": {
                        "items": [
                          {
                            "simpleResponse": {
                              "textToSpeech": "Please tell me your issue ?"
                            }
                          },
                          
                        ],
                        "suggestions": [
                          {
                            "title": "internet"
                          },
                          {
                            "title": "hardware"
                          },
                          {
                            "title": "admin access"
                          },
                          {
                            "title":"account locked"
                          }
                        ],
                
                      }
                    }
                  }
        
            });

        } else if (!(req.body.result &&
            req.body.result.parameters &&
            req.body.result.parameters.priority)) {
            return res.json({
                speech: "Can you tell me the priority of the issue ?",
                displayText: "Can you tell me the priority of the issue ?",
                source:"google",
                "data": {
                    "google": {
                      "expectUserResponse": true,
                      "richResponse": {
                        "items": [
                          {
                            "simpleResponse": {
                              "textToSpeech": "Can you tell me the priority of the issue ?"
                            }
                          },
                          
                        ],
                        "suggestions": [
                          {
                            "title": "high"
                          },
                          {
                            "title": "medium"
                          },
                          {
                            "title": "low"
                          }
                        ],
                
                      }
                    }
                  }
        
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
            
            id_ti += 1; 
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
                "id" :id_ti,
                
            }
            
            service.push(ticket_obj);
            console.log(service);
           
            return res.json({

                "speech": "Issue raised",
                "displayText": "Issue raised",
                //ADD CARD HERE TASK REMAININg
                "data": {
                  "google": {
                    "expectUserResponse": true,
                    "richResponse": {
                      "items": [
                        {
                          "simpleResponse": {
                            "textToSpeech": "Here are your ticket details"
                          }
                        },
                        {
                          "basicCard": {
                              "title": "Service ticket ID " +ticket_obj.id,
                              "subtitle":"Name - " + ticket_obj.name,
                              "formattedText": "Issue " +ticket_obj.issue,
                              "image": null,
                              "buttons": null,
                              "imageDisplayOptions": "CROPPED"
                          }
                      }
                      ]
                    }
                  },
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
        
    } else /*if(req.body.result.metadata.intentName == "ViewTicket")*/ {
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
              var requ = JSON.stringify(req.body.result)
              console.log('Req event - ' +requ); 
                var resp = []
                var i;
                for (i = 0; i<service.length;i++) {
                    resp.push({
                        "optionInfo": {
                          "key": "ticket - " +service[i].id
                        },
                        "title": "Service ticket ID - " +service[i].id,
                        "description": "ISSUE - "+service[i].issue,
                      },
                    )
                }
                if (service.length == 1) {
                  res.json({
                    "speech": "Your ticket",
                "displayText": "Your ticket",
                "data": {
                  "google": {
                    "expectUserResponse": true,
                    "richResponse": {
                      "items": [
                        {
                          "simpleResponse": {
                            "textToSpeech": "Here are your ticket details"
                          }
                        },
                        {
                          "basicCard": {
                              "title": "Service ticket ID " +service[0].id,
                              "subtitle":"Name - " + service[0].name,
                              "formattedText": "Issue " +service[0].issue,
                              "image": null,
                              "buttons": null,
                              "imageDisplayOptions": "CROPPED"
                          }
                      }
                      ]
                    }
                  },
                },
                "contextOut": [
                        {
                            "name": "_actions_on_google",
                            "lifespan": 99,
                            "parameters": {
                            "data": "{}"
                        }
                    }
                ],
                
                  })

                } else {
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
                                  "textToSpeech": "Choose a issue to view"
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
                      },
                      "followupEvent": {
                        "name": "viewSingleticket",
                        "parameters": {
                        "id": 10
                          }
                      }
                    });
                }
                
        }
        
    } /*else if (req.body.result.metadata.intentName == "ViewSingleTicket"){
      res.json({
        
          "responseId": "ea166558-615a-48f3-ae5b-7f55d895784b",
          "queryResult": {
            "queryText": "actions_intent_OPTION",
            "action": "",
            "parameters": {},
            "allRequiredParamsPresent": true,
            "fulfillmentText": "",
            "fulfillmentMessages": [],
            "outputContexts": [
              {
                "name": "projects/${PROJECTID}/agent/sessions/${SESSIONID}/contexts/actions_intent_option",
                "parameters": {
                  "OPTION": ""//"key of selected item"
                }
              }
            ],
            "intent": {
              "name": "projects/${PROJECTID}/agent/intents/1777d616-a5f7-4838-a9a9-870f2956bd14",
              "displayName":  "ViewSingleTicket" //"Dialogflow intent name of matched intent"
            },
            "intentDetectionConfidence": 1,
            "diagnosticInfo": {},
            "languageCode": "en-us"
          },
          "originalDetectIntentRequest": {
            "source": "google",
            "version": "1",
            "payload": {
              "isInSandbox": true,
              "surface": {
                "capabilities": []
              },
              "inputs": [
                {
                  "rawInputs": [
                    {
                      "query": "Title of selected item",
                      "inputType": "TOUCH"
                    }
                  ],
                  "arguments": [
                    {
                      "textValue": "Key of selected item",
                      "name": "OPTION"
                    }
                  ],
                  "intent": "actions.intent.OPTION"
                }
              ],
              "user": {},
              "conversation": {},
              "availableSurfaces": []
            }
          },
          "session": "projects/${PROJECTID}/agent/sessions/${SESSIONID}"
        
      })

    }*/
      
}


)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))