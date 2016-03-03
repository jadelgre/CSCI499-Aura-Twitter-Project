({

	getAllTweetsByUser : function(component, event, helper) {
        console.log('lol inuser profile controller');

        var targetUserId = component.get("v.userId");

        console.log("targeting user " + targetUserId + " in userprofile controller ");

		var action = component.get("c.getTweetsByUser");
		action.setParams({
			"targetUserId" : targetUserId
		})
		action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                console.log("Server responded in USER get all tweets: ");
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
	}

})