({
	createAndAddTweet : function(component, tweetObj) {
		var newTweet = $A.createComponent("twitter:tweet", ({
			// set component attributes
			"tweetBody" : tweetObj['tweetBody'],
			"tweetSender" : tweetObj['tweetSender'],
			"tweetTimestamp" : helper.getTimestamp()
		}), function(newTweet) {
			var body = component.get("v.body"); 
			body.unshift(newTweet); // prepend the tweet to the body
			component.set("v.body", body); // update the view with the updated body
			console.log('tweet added to body');
		});
	},


	getTimestamp : function() {
		var date = new Date();
		var dateString = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + " " + date.getHours()+ ":" + date.getMinutes() + ":" + date.getSeconds();
		return dateString;
	}
})