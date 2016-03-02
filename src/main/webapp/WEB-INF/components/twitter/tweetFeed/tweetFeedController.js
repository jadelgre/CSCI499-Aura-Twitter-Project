({
	doInit : function(component, event, helper) {
		var action = component.get("c.getFeedTweets");
		action.setParams({
			quantity : 20
		})
		action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                console.log("Server responded in init");
                console.log(response.getReturnValue());
				var allTweets = component.get("v.tweetArray");
				
				component.set("v.tweetArray", response.getReturnValue());
                // add tweet to array to be displayed
            } else {
            	var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }

            }
        });
        $A.enqueueAction(action);


  //       var myTweet = {};
		// var action = component.get("c.getTweet");
  //       action.setCallback(this, function(response) {
  //           if (response.getState() === "SUCCESS") {
  //               console.log("Server responded: ");
  //               console.log(response.getReturnValue());

  //               // add tweet to array to be displayed
  //               var tweets = [response.getReturnValue()];
  //       		component.set("v.tweetArray", tweets);
  //           } else {
  //           	var errors = response.getError();
  //               if (errors) {
  //                   if (errors[0] && errors[0].message) {
  //                       console.log("Error message: " +
  //                                errors[0].message);
  //                   }
  //               } else {
  //                   console.log("Unknown error");
  //               }

  //           }
  //       });
  //       $A.enqueueAction(action);

        // var tweets = [myTweet];
        // component.set("v.tweetArray", tweets);
        // console.log("name " + myTweet["name"]);

		console.log('do init');	
	},

	receiveMessage : function(component, event, helper) {
		var messageText = event.getParam("text");

		var allTweets = component.get("v.tweetArray");
		var newTweet = {
			"message" : messageText,
			"name" : "Jacob",
			"imgUrl" : "/img/avatar1.jpg",
			"date" : helper.getTimestamp()
		};

		// send tweet to database
		var action = component.get("c.sendTweet");
		action.setParams({
			"message" : messageText,
			"userId" : 0
		});
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                console.log("Server responded: ");
                console.log(response.getReturnValue());

                // add tweet to array to be displayed
            } else {
            	var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }

            }
        });
        $A.enqueueAction(action);

		allTweets.unshift(newTweet);

		component.set("v.tweetArray", allTweets);

		// create a new tweet component
		// var newTweet = $A.createComponent("twitter:tweet", ({
		// 	// set component attributes
		// 	"message" : messageText,
		// 	"name" : "User",
		// 	"tweetTimestamp" : helper.getTimestamp()
		// }), function(newTweet) {
		// 	var body = component.get("v.body"); 
		// 	body.unshift(newTweet); // prepend the tweet to the body
		// 	component.set("v.body", body); // update the view with the updated body
		// 	console.log('tweet added to body');
		// });
		
	},

	getLatestTweet : function(component, event, helper) {
		var action = component.get("c.getLastTweet");
		action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                console.log("Server responded in get lastest tweet: ");
                console.log(response.getReturnValue());


                
				var allTweets = component.get("v.tweetArray");
				allTweets.unshift(response.getReturnValue());
				component.set("v.tweetArray", allTweets);
                // add tweet to array to be displayed
            } else {
            	var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }

            }
        });
        $A.enqueueAction(action);
	},

	getAllTweetsByUser : function(component, event, helper) {
		var action = component.get("c.getTweetsByUser");
		action.setParams({
			"targetUserId" : 0
		})
		action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                console.log("Server responded in get all tweets: ");
                console.log(response.getReturnValue());


                
				var allTweets = component.get("v.tweetArray");
				// response.getReturnValue().forEach( function(tweet) {
				// 	allTweets.unshift(tweet);
				// });
						
				
				component.set("v.tweetArray", response.getReturnValue());
                // add tweet to array to be displayed
            } else {
            	var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }

            }
        });
        $A.enqueueAction(action);
	},

	viewProfile : function(component, event, helper) {
	 	var selectedItem = event.currentTarget;
        var profileId = selectedItem.dataset.record;




		$A.get('e.ui:createPanel').setParams({
	    panelType: 'modal',
	    visible: true,
	    panelConfig: {
	        title: 'Modal Header',
	        body: "body",
	        flavor: 'myFlavor',
	        footer: "footer"
	        },
	        onCreate: function(panel){
	            //do something
	        }
	    }).fire();
	}

})