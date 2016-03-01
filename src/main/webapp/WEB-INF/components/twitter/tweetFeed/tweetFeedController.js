({
	doInit : function(component, event, helper) {
		// var tweets = [
		// 	{
		// 		"message" : "Sounds like somebody has a case of the mondays",
		// 		"name" : "Annoying Person",
		// 		"imgUrl" : "/img/avatar2.jpg",
		// 		"date" : new Date()
		// 	},
		// 	{
		// 		"message" : "Can't wait for the weekend!",
		// 		"name" : "Annoying Person",
		// 		"imgUrl" : "/img/avatar3.jpg",
		// 		"date" : new Date()
		// 	},
		// 	{
		// 		"message" : "Some priceless paintings are imperfect for transferring resources from Coors Brewery to take calligraphy!",
		// 		"name" : "Markov",
		// 		"imgUrl" : "/img/avatar2.jpg",
		// 		"date" : new Date()
		// 	}
		// 	,
		// 	{
		// 		"message" : "At this year. There's always the loch ness monster What would finals snapchat Too true. When high school.",
		// 		"name" : "Markov",
		// 		"imgUrl" : "/img/avatar3.jpg",
		// 		"date" : new Date()
		// 	},
		// 	{
		// 		"message" : "The best part of things drum n bass + code had feelings I'll take their finals week in a solid state?",
		// 		"name" : "Markov",
		// 		"imgUrl" : "/img/avatar2.jpg",
		// 		"date" : new Date()
		// 	},
		// 	{
		// 		"message" : "Me: do you think you speak English? hahahahahahahahahahahaha ..no. Yes, with finals I remain",
		// 		"name" : "Markov",
		// 		"imgUrl" : "/img/avatar3.jpg",
		// 		"date" : new Date()
		// 	},
		// 	{
		// 		"message" : "Not literally 10 feet, a puppy dogs, puppy dogs, medium dogs, puppy dogs, big dogs, medium dogs, puppy!",
		// 		"name" : "Markov",
		// 		"imgUrl" : "/img/avatar3.jpg",
		// 		"date" : new Date()
		// 	},
		// 	{
		// 		"message" : "Ayyliens The villains I expect you can literally 10 ft beard. Not literally touch them your time!",
		// 		"name" : "Markov",
		// 		"imgUrl" : "/img/avatar2.jpg",
		// 		"date" : new Date()
		// 	},
		// 	{
		// 		"message" : "2003 Honda Civic With Power Windows How people will call me with the Junglo music cult? me: what? you.",
		// 		"name" : "Markov",
		// 		"imgUrl" : "/img/avatar3.jpg",
		// 		"date" : new Date()
		// 	},
		// 	{
		// 		"message" : "My college paid the ICP Hard mode = Ice roads - 7AM” Me - Traction Control i feel like this.",
		// 		"name" : "Markov",
		// 		"imgUrl" : "/img/avatar2.jpg",
		// 		"date" : new Date()
		// 	},
		// 	{
		// 		"message" : "When you haven't looked outside it's out of oil My New year's resolution: spend more reliable time on my?",
		// 		"name" : "Markov",
		// 		"imgUrl" : "/img/avatar3.jpg",
		// 		"date" : new Date()
		// 	}
		// ];

		// component.set("v.tweetArray", tweets);

		// ping the server
        // var action = component.get("c.getAppName");
        // action.setParams({
        //     appKey: "TestApp"
        // });
        // action.setCallback(this, function(response) {
        //     if (response.getState() === "SUCCESS") {
        //         console.log("Server responded: " + response.getReturnValue());
        //     } else {
        //     	var errors = response.getError();
        //         if (errors) {
        //             if (errors[0] && errors[0].message) {
        //                 console.log("Error message: " +
        //                          errors[0].message);
        //             }
        //         } else {
        //             console.log("Unknown error");
        //         }

        //     }
        // });
        // $A.enqueueAction(action);

        // call the constructor
        // var action = component.get("c.initialize");
        // action.setCallback(this, function(response) {
        //     if (response.getState() === "SUCCESS") {
        //         console.log("Server responded in init: ");
        //         console.log(response.getReturnValue());

        //         // add tweet to array to be displayed
        //         //var tweets = [response.getReturnValue()];
        // 		//component.set("v.tweetArray", tweets);
        //     } else {
        //     	var errors = response.getError();
        //         if (errors) {
        //             if (errors[0] && errors[0].message) {
        //                 console.log("Error message: " +
        //                          errors[0].message);
        //             }
        //         } else {
        //             console.log("Unknown error");
        //         }

        //     }
        // });
        // $A.enqueueAction(action);

        var myTweet = {};
		var action = component.get("c.getTweet");
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                console.log("Server responded: ");
                console.log(response.getReturnValue());

                // add tweet to array to be displayed
                var tweets = [response.getReturnValue()];
        		component.set("v.tweetArray", tweets);
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

		// get a tweet from the database
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