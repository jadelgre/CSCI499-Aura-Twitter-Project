({
	receiveMessage : function(component, event, helper) {
		var messageText = event.getParam("text");
		console.log("received a Message: " + messageText);
		var appendTweet = function(newTweet) {
			console.log('created tweet');
		}
		var newTweet = $A.createComponent("twitter:tweet", ({
			"tweetBody" : messageText
		}), function(newTweet) {
			var body = component.get("v.body");
			body.push(newTweet);
			component.set("v.body", body);
			console.log('tweet added to body');
		});
		
	},

	createTweet : function(controller, event, helper) {
		console.log('created new tweet');
	}
})