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
                            "items": [
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
                            "key": "MATH_AND_PRIME",
                            "synonyms": [
                                "math",
                                "math and prime",
                                "prime numbers",
                                "prime"
                            ]
                        },
                        "title": "Math & prime numbers",
                        "description": "42 is an abundant number because the sum of its proper divisors 54 is greater…",
                        "image": {
                            "url": "http://example.com/math_and_prime.jpg",
                            "accessibilityText": "Math & prime numbers"
                        }
                    },

                    )
                }
                return res.json({
                
                    "speech": "Raised tickets",
                    "displayText": "this text is displayed visually",
                    "data":{
                        "google": {
                            "expectedUserResponse":true,
                            "richResponse" : {
                                "items" : [
                                    {
                                        "simpleResponse" : {
                                            "textToSpeech": "Your issues are listed below"                                        }
                                    },
                                    {
                                        "listSelect": {
                        
                                        "title": "List of issues raised", 
                                        "items": [
                                            {
                                                "optionInfo": {
                                                    "key": "MATH_AND_PRIME",
                                                    "synonyms": [
                                                        "math",
                                                        "math and prime",
                                                        "prime numbers",
                                                        "prime"
                                                    ]
                                                },
                                                "title": "Math & prime numbers",
                                                "description": "42 is an abundant number because the sum of its proper divisors 54 is greater…",
                                                "image": {
                                                    "url": "http://example.com/math_and_prime.jpg",
                                                    "accessibilityText": "Math & prime numbers"
                                                }
                                            },
                                        ]          
                                            }
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
        
    }
      
}


)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))