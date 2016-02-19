({
	doInit : function(component, event, helper) {
		var tweets = [
			{
				"message" : "Sounds like somebody has a case of the mondays",
				"name" : "Annoying Person",
				"imgUrl" : "/img/avatar2.jpg",
				"date" : new Date()
			},
			{
				"message" : "Can't wait for the weekend!",
				"name" : "Annoying Person",
				"imgUrl" : "/img/avatar3.jpg",
				"date" : new Date()
			},
			{
				"message" : "Some priceless paintings are imperfect for transferring resources from Coors Brewery to take calligraphy!",
				"name" : "Markov",
				"imgUrl" : "/img/avatar2.jpg",
				"date" : new Date()
			}
			,
			{
				"message" : "At this year. There's always the loch ness monster What would finals snapchat Too true. When high school.",
				"name" : "Markov",
				"imgUrl" : "/img/avatar3.jpg",
				"date" : new Date()
			},
			{
				"message" : "The best part of things drum n bass + code had feelings I'll take their finals week in a solid state?",
				"name" : "Markov",
				"imgUrl" : "/img/avatar2.jpg",
				"date" : new Date()
			},
			{
				"message" : "Me: do you think you speak English? hahahahahahahahahahahaha ..no. Yes, with finals I remain",
				"name" : "Markov",
				"imgUrl" : "/img/avatar3.jpg",
				"date" : new Date()
			},
			{
				"message" : "Not literally 10 feet, a puppy dogs, puppy dogs, medium dogs, puppy dogs, big dogs, medium dogs, puppy!",
				"name" : "Markov",
				"imgUrl" : "/img/avatar3.jpg",
				"date" : new Date()
			},
			{
				"message" : "Ayyliens The villains I expect you can literally 10 ft beard. Not literally touch them your time!",
				"name" : "Markov",
				"imgUrl" : "/img/avatar2.jpg",
				"date" : new Date()
			},
			{
				"message" : "2003 Honda Civic With Power Windows How people will call me with the Junglo music cult? me: what? you.",
				"name" : "Markov",
				"imgUrl" : "/img/avatar3.jpg",
				"date" : new Date()
			},
			{
				"message" : "My college paid the ICP Hard mode = Ice roads - 7AM” Me - Traction Control i feel like this.",
				"name" : "Markov",
				"imgUrl" : "/img/avatar2.jpg",
				"date" : new Date()
			},
			{
				"message" : "When you haven't looked outside it's out of oil My New year's resolution: spend more reliable time on my?",
				"name" : "Markov",
				"imgUrl" : "/img/avatar3.jpg",
				"date" : new Date()
			}
		];

		component.set("v.tweetArray", tweets);

		// for(var index in tweets) { // iterate over the indicies of the array
		// 	var date = new Date();
		// 	var dateString = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + " " + date.getHours()+ ":" + date.getMinutes() + ":" + date.getSeconds();
		// 	var newTweet = $A.createComponent("twitter:tweet", ({
		// 		// set component attributes
		// 		"message" : tweets[index]['message'],
		// 		"name" : tweets[index]['name'],
		// 		"tweetTimestamp" : dateString
		// 	}), function(newTweet) {
		// 		var body = component.get("v.body"); 
		// 		body.unshift(newTweet); // prepend the tweet to the body
		// 		component.set("v.body", body); // update the view with the updated body
		// 		console.log('tweet added to body');
		// 	});
		// }
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
		
	}
})