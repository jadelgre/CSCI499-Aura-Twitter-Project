({
	sendTweet : function(component, event, helper) {
        var status = component.find("statusMessage").get("v.value");

        // make sure that there is at least some kind of text
       	if(typeof status == 'undefined' || status == "" || status == null) {
          // Set the message to be displayed to the user
          var errorText = "You cannot send an empty tweet!"; //  component.find("statusMessage").get("v.value");
          component.set("v.errorText", errorText);
       		return;
       	} else if (status.length > 255) { // make sure we can store the text in the DB
          var errorText = "You cannot tweet more than 255 characters! Current length: " + status.length + " characters."; //  component.find("statusMessage").get("v.value");
          component.set("v.errorText", errorText);
          return;
        } else { // clear errors if any
          component.set("v.errorText", "");
        }

       	// create a tweet event, set the text to user's input, fire it
       	var tweetEvent = $A.get("e.twitter:tweetMessageEvent");
       	tweetEvent.setParams({
       		"text" : status,
       	});
       	tweetEvent.fire();

       	//  TODO clear the text box
        component.set("v.inputText", "");

   }
})