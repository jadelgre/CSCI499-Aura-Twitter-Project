({
	receiveMessage : function(component, event, helper) {
		var messageText = event.getParam("text");

		// create a new tweet component
		var newTweet = $A.createComponent("twitter:tweet", ({
			// set component attributes
			"tweetBody" : messageText,
			"tweetSender" : "User",
			"tweetTimestamp" : helper.getTimestamp()
		}), function(newTweet) {
			var body = component.get("v.body");
			body.push(newTweet);
			component.set("v.body", body);
			console.log('tweet added to body');
		});
		
	}
})