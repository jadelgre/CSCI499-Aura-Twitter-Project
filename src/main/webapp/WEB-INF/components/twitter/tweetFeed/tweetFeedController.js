({
	doInit : function(component, event, helper) {
		var tweets = [
			{
				"tweetBody" : "Sounds like somebody has a case of the mondays",
				"tweetSender" : "Annoying Person",
			},
			{
				"tweetBody" : "Can't wait for the weekend!",
				"tweetSender" : "Annoying Person"
			},
			{
				"tweetBody" : "Some priceless paintings are imperfect for transferring resources from Coors Brewery to take calligraphy!",
				"tweetSender" : "Markov"
			}
			,
			{
				"tweetBody" : "At this year. There's always the loch ness monster What would finals snapchat Too true. When high school.",
				"tweetSender" : "Markov"
			},
			{
				"tweetBody" : "The best part of things drum n bass + code had feelings I'll take their finals week in a solid state?",
				"tweetSender" : "Markov"
			},
			{
				"tweetBody" : "Me: do you think you speak English? hahahahahahahahahahahaha ..no. Yes, with finals I remain",
				"tweetSender" : "Markov"
			},
			{
				"tweetBody" : "Not literally 10 feet, a puppy dogs, puppy dogs, medium dogs, puppy dogs, big dogs, medium dogs, puppy!",
				"tweetSender" : "Markov"
			},
			{
				"tweetBody" : "Ayyliens The villains I expect you can literally 10 ft beard. Not literally touch them your time!",
				"tweetSender" : "Markov"
			},
			{
				"tweetBody" : "2003 Honda Civic With Power Windows How people will call me with the Junglo music cult? me: what? you.",
				"tweetSender" : "Markov"
			},
			{
				"tweetBody" : "My college paid the ICP Hard mode = Ice roads - 7AM” Me - Traction Control i feel like this.",
				"tweetSender" : "Markov"
			},
			{
				"tweetBody" : "When you haven't looked outside it's out of oil My New year's resolution: spend more reliable time on my?",
				"tweetSender" : "Markov"
			}
		];

		for(var index in tweets) { // iterate over the indicies of the array
			var date = new Date();
			var dateString = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + " " + date.getHours()+ ":" + date.getMinutes() + ":" + date.getSeconds();
			var newTweet = $A.createComponent("twitter:tweet", ({
				// set component attributes
				"tweetBody" : tweets[index]['tweetBody'],
				"tweetSender" : tweets[index]['tweetSender'],
				"tweetTimestamp" : dateString
			}), function(newTweet) {
				var body = component.get("v.body"); 
				body.unshift(newTweet); // prepend the tweet to the body
				component.set("v.body", body); // update the view with the updated body
				console.log('tweet added to body');
			});
		}
		console.log('do init');	
	},

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
			body.unshift(newTweet); // prepend the tweet to the body
			component.set("v.body", body); // update the view with the updated body
			console.log('tweet added to body');
		});
		
	}
})