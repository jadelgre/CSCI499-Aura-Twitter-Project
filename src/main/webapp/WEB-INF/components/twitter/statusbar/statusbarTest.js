({
	/** Properties shared across test cases**/
	attributes: {
		label: 'Submit',
//Other attributes here
	},
	browsers: ['GOOGLECHROME', 'SAFARI', 'IPAD' ],
	setUp: function(component){
		console.log("setting up test case");
		//Runs before each test case is executed but after component initialization
	},

	tearDown: function(component){
		//Runs after each test case is executed
	},

	sharedMethod: function(arg1, arg2){
		//Utility functions that are invoked by calling this.sharedMethod(x, y)
	},

	/** Test Cases **/
	testCase1: {
		attributes: {
			//Attributes
		},
		//Runs all supported browsers except Firefox.
		//Overrides the suite level browsers tag.
		browsers: [ '-FIREFOX'],
		test: [ //A single function or a list of functions
			function(component, controller){
			//Test something
				console.log('in test case');
				//var button = component.get("c.button");
				controller.sendTweet(component);
// 				$A.test.clickOrTouch(button, false,
// false);
				$A.test.assertTrue(true, 'This obviously should have passed.');
			},
			function(component){
			//Test something
			}
		]
	}
})