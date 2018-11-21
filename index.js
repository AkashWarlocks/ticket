const express = require('express');
const bodyparser = require('body-parser');
const request = require('request');

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
  
        
    if(req.body.result.metadata.intentName === "Service_Ticket")
    {
         if (!(req.body.result &&
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
                            "title": "Internet"
                          },
                          {
                            "title": "Hardware"
                          },
                          {
                            "title": "Admin Access"
                          },
                          {
                            "title":"Account Locked"
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
                            "title": "High"
                          },
                          {
                            "title": "Medium"
                          },
                          {
                            "title": "Low"
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


        } else if (!(req.body.result &&
          req.body.result.parameters &&
          req.body.result.parameters.name)) {
          return res.json({
              speech: "Can I know your good name please ?",
              displayText: "Can I know your name ?",
              source:"google"
  
          });

        } else {

            var id_ti = Math.floor(Math.random() * (99999 - 10000 + 1) ) + 10000; 
            console.log("id number - "+id_ti);
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
                "id" :"INC"+id_ti,

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
                              "subtitle":"Category: " + ticket_obj.issue,
                              "formattedText": "**Issue**: " +ticket_obj.comment+"  \n**Priority**: "+ticket_obj.priority,
                          }
                      },
                    ],
                        "suggestions": [
                          {
                            "title": "Create Ticket"
                          },
                          {
                            "title": "View Tickets"
                          }
                        ],  
                    }
                  },
                },
                });
            }

    } else if(req.body.result.metadata.intentName === "View_ticket") {
           if(service.length === 0) {
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
                              ],
                                  "suggestions": [
                                    {
                                      "title": "Create Ticket"
                                    },
                                    {
                                      "title": "View Tickets"
                                    }
                                  ], 
                        }  
                    }
                },
            });
           } else {
              var requ = JSON.stringify(req.body.result)
              console.log('Req event - ' +requ);
              console.log('length- ' +service.length); 
                var resp = []
                var i;
                for (i = 0; i<service.length; i++) {
                  if(service[i].issue === "internet") {
                    var image = "https://raw.githubusercontent.com/AkashWarlockz/ticket/master/images/internet-min.png"
                    var accText = "Internet"
                  } else if (service[i].issue === "hardware") {
                    var image = "https://raw.githubusercontent.com/AkashWarlockz/ticket/master/images/hardware-min.png"
                    var accText = "Hardware"
                  } else if (service[i].issue === "account locked") {
                    var image = "https://raw.githubusercontent.com/AkashWarlockz/ticket/master/images/acclocked-min.png"
                    var accText = "Accountlocked"
                  }else if (service[i].issue === "admin access") {
                    var image = "https://raw.githubusercontent.com/AkashWarlockz/ticket/master/images/admin-min.png"
                    var accText = "Admin"
                  }
                    resp.push({
                        
                      "optionInfo": {
                        "key": i.toString()
                      },
                      "description": "Raised by: "+service[i].name,
                      "image": {
                        "url": image,
                        "accessibilityText": accText
                      },
                      "title": "SERVICE TICKET- " +service[i].id,
                    
                })
              }
                console.log("List response " +(JSON.stringify(resp)));
                console.log("resp length - "+resp.length);
                if (resp.length == 1) {
                  res.json({
                    "speech": "Okay I can get that for you.",
                "displayText": "Okay I can get that for you.",
                "data": {
                  "google": {
                    "expectUserResponse": true,
                    "richResponse": {
                      "items": [
                        {
                          "simpleResponse": {
                            "textToSpeech": "So "+service[0].name+" this is the ticket raised by you",
                          }
                        },
                        {
                          "basicCard": {
                              "title": "Service ticket ID " +service[0].id,
                              "subtitle":"Name - " + service[0].name,
                              "formattedText": "**Issue:** " +service[0].comment+"  \n**Priority:** "+service[0].priority,   
                          }
                      },                 
                      ],
                      "suggestions": [
                        {
                          "title": "Create Ticket"
                        },
                        {
                          "title": "View Tickets"
                        }
                      ],
                    }
                  },
                },
                "contextOut": [
                        {
                            "name": "_actions_on_google",
                            "lifespan": 2,
                            "parameters": {
                            "data": "{}"
                        }
                    }
                ],
                
                  })

                } else {
                  return res.json({
                
                    "speech": "Okay I will get list of issues raised in the form of list",
                    "displayText": "Now you can see all the issue raised.",
                    "data": {
                      "google": {
                        "expectUserResponse": true,
                    
                        "richResponse": {
                          "items": [
                            {
                              "simpleResponse": {
                                "textToSpeech": "Okay you can view the list of issues raised.  \nClick on any issue to see the details"
                              }
                            }
                          ]
                        },
                        "systemIntent": {
                          "intent": "actions.intent.OPTION",
                          "data": {
                            "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
                            "listSelect": {
                              "title": "Issue List",
                              "items":resp,
                            }
                          }
                        }
                      }
                    
                    },
                  });
                }
              }
                
        }else if (req.body.result.metadata.intentName === "View_Single_Ticket"){
          
      console.log("id in follow up"+ JSON.stringify (req.body.result));
      var num = req.body.result &&
      req.body.result.parameters &&
      req.body.result.parameters.id;

      res.json({
        "speech": "The selected ticket is raised by "+service[num].name,
        "displayText": "This card contains all the details of ticket you have selected",   
        "data": {
          "google": {
            "expectUserResponse": true,
            "richResponse": {
              "items": [
                {
                  "simpleResponse": {
                    "textToSpeech": "Hey "+service[num].name+" the details of the issue raised by you are"
                  }
                },
                {
                  "basicCard": {
                      "title": "Service ticket ID " +service[num].id,
                      "subtitle":"Category: " +service[num].issue,
                      "formattedText": "**Issue:** " +service[num].comment+"  \n**Priority:** "+service[num].priority,
                  }
              },
            ],
                "suggestions": [
                  {
                    "title": "Create Ticket"
                  },
                  {
                    "title": "View Tickets"
                  }
                ],              
            }
          },
        },
      })
    } else if(req.body.result.metadata.intentName === "Category_ticket") {
      var category_issue = [];
      request.get('https://isg-poc.herokuapp.com/TICKETCOUNT', { json: true }, (err, respi, body) => {
            if(err) {
              console.log('error: '+err)
            }
      console.log((body.SERVICE_TKTS_RES.SERVICE_TKT_COUNTS))    

      for(var i = 0;i<body.SERVICE_TKTS_RES.SERVICE_TKT_COUNTS.length;i++) {
              category_issue.push({
                "title": body.SERVICE_TKTS_RES.SERVICE_TKT_COUNTS[i].TICKET_NAME,
                "description": "Description of item 1",
                "footer": "Item 1 footer",
                "image": {
                  "url": "https://www.gstatic.com/mobilesdk/170329_assistant/assistant_color_96dp.png",
                  "accessibilityText": "Google Assistant Bubbles"
                },
                "openUrlAction": {
                  "url": "https://github.com"
                }
              });
      
            }

            console.log("array: "+category_issue);

            res.json({
              "speech": "The selected ticket is raised by ",  
              "displayText": "This card contains all the details of ticket you have selected",
              "data": {
                "google": {
                  "expectUserResponse": true,
              
                  "richResponse": {
                    "items": [
                      {
                        "simpleResponse": {
                          "textToSpeech": "Okay you can view the list of issues raised.  \nClick on any issue to see the details"
                        }
                      },
                      {
                        "carouselBrowse": {
                          "items": [
                            {
                              "title": "Title of item 1",
                              "openUrlAction": {
                                "url": "https://google.com"
                              },
                              "description": "Description of item 1",
                              "footer": "Item 1 footer",
                              "image": {
                                "url": "https://developers.google.com/actions/assistant.png",
                                "accessibilityText": "Google Assistant Bubbles"
                              }
                            },
                            {
                              "title": "Title of item 2",
                              "openUrlAction": {
                                "url": "https://google.com"
                              },
                              "description": "Description of item 2",
                              "footer": "Item 2 footer",
                              "image": {
                                "url": "https://developers.google.com/actions/assistant.png",
                                "accessibilityText": "Google Assistant Bubbles"
                              }
                            }
                          ]
                        }
                      
                      },
                    ]
                    }
                    
                  }
                 
                }
                
            })
           
          });

        
     
    }
  } 
)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
