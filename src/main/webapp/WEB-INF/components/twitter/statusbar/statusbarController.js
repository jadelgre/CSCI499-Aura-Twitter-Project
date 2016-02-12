({
	sendTweet : function(component, event, helper) {
        var status = component.find("statusMessage").get("v.value");

        // make sure that there is at least some kind of text
       	if(typeof status == 'undefined' || status == "" || status == null) {
       		return;
       	}

       	// create a tweet event, set the text to user's input, fire it
       	var tweetEvent = $A.get("e.twitter:tweetMessageEvent");
       	tweetEvent.setParams({
       		"text" : status
       	});
       	tweetEvent.fire();

       	//  TODO clear the text box
        component.set("v.inputText", "");

   }
})