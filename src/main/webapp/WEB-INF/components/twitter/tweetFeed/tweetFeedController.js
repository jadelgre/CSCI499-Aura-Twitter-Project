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
                // console.log("Server responded: ");
                // console.log(response.getReturnValue());

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
        var profileId = selectedItem.dataset.record; // get the value stored in corresponding data-record html attribute

        var profileValues;

        console.log("Clicked on profile of user " + profileId);

        // query the DB to get user profile
        var action = component.get("c.getUserInfo");
		action.setParams({
			desiredUserInfo : profileId
		});
		action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                console.log("Server responded in view user: ");

                profileValues = response.getReturnValue();

                console.log(profileValues);

                helper.createProfileModal(component, profileValues);
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
        
	}

})