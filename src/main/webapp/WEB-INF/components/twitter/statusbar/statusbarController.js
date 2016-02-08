({
	sendTweet : function(component, event, helper) {
        var text = component.find("statusMessage").get("v.value");

       	if(typeof text == 'undefined' || text == "" || text == null) {
       		return;
       	}

       	var tweetEvent = $A.get("e.twitter:tweetMessageEvent");
       	tweetEvent.setParams({
       		"text" : text
       	});
       	tweetEvent.fire();
   }
})