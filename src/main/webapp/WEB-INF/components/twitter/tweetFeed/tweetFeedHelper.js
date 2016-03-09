({

	getTimestamp : function() {
		var date = new Date();
		var dateString = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + " " + date.getHours()+ ":" + date.getMinutes() + ":" + date.getSeconds();
		return dateString;
	},

	createProfileModal : function(component, profileValues) {

		$A.createComponent(
			"twitter.userProfile",
			{
				"userId" : profileValues["userId"],
				"userName" : profileValues["name"],
				"message" : profileValues["summary"]
			}
			, function (feed) {
				console.log("created tweet feed in profile modal");

				$A.get('e.ui:createPanel').setParams({
				    panelType: 'modal',
				    visible: true,
				    panelConfig: {
				        title: profileValues['name'],
				        body: feed,
				        flavor: 'myFlavor',
				        //footer: "footer"
				        },
				        onCreate: function(panel){
				            //do something
				            console.log("modal created");
				        }
				    }).fire();
			});
	},

	loadFeed : function(component, helper) {
		var action = component.get("c.getFeedTweets");
		action.setParams({ // set the maximum number of tweets to load
			quantity : 20
		})
		action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
				var allTweets = component.get("v.tweetArray");
				
				component.set("v.tweetArray", response.getReturnValue());
            } else {
            	helper.checkReturnForErrors(response, "loadFeed");
            }
        });
        $A.enqueueAction(action);
	},

	checkReturnForErrors : function(serverResponse, callingFunctionName) {
		var errors = serverResponse.getError();
	    if (errors) {
	        if (errors[0] && errors[0].message) {
	            console.log("An error occurred in " + callingFunctionName + ".Error message: " +
	                     errors[0].message);
	        }
	    } else {
	        console.log("Unknown error occurred in " + callingFunctionName);
	    }
	},

	sendTweet : function(component, helper, messageText) {
		// send tweet to database
		var action = component.get("c.sendTweet");
		action.setParams({
			"message" : messageText,
			"userId" : 0
		});
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
            	// purposely do nothing
            } else {
            	checkReturnForErrors(response, "sendTweet");
            }
        });
        $A.enqueueAction(action);
	}
})