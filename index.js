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
        
    } else if(req.body.result.metadata.intentName == "ViewTicket") {
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
                  /**
                   * {
                                  "optionInfo": {
                                    "key": "first title"
                                  },
                                  "description": "first description",
                                  "image": {
                                    "url": "https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png",
                                    "accessibilityText": "first alt"
                                  },
                                  "title": "first title"
                                },
                   */
                    resp.push({
                        "optionInfo": {
                          "key": service[i].id
                        },
                        "title": "Service ticket ID - " +service[i].id,
                        "description": "ISSUE - "+service[i].issue,
                        "image":null
                      },
                    )
                }
                console.log("List response " +resp)
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
                              "title": "Hello",
                              "items":[
                                {
                                  "optionInfo": {
                                    "key": "first title"
                                  },
                                  "description": "first description",
                                  "image": {
                                    "url": "https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png",
                                    "accessibilityText": "first alt"
                                  },
                                  "title": "first title"
                                },
                                {
                                  "optionInfo": {
                                    "key": "second"
                                  },
                                  "description": "second description",
                                  "image": {
                                    "url": "https://lh3.googleusercontent.com/Nu3a6F80WfixUqf_ec_vgXy_c0-0r4VLJRXjVFF_X_CIilEu8B9fT35qyTEj_PEsKw",
                                    "accessibilityText": "second alt"
                                  },
                                  "title": "second title"
                                }
                              ]
                            }
                          }
                        }
                      }
                    
                    }
                  });
                }
                
        }
        
    } else if (req.body.result.metadata.intentName == "View_Single_Ticket"){

      
      res.json({
        "speech": "Selected ticket",
        "displayText": "this text is displayed visually",   
      })

    }
      
}


)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))