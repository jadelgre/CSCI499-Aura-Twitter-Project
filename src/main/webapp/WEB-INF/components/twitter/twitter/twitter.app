<aura:application>
	Hello!
	<link rel="stylesheet" href="/css/salesforce-lightning-design-system.css" />
	<div aura:id="body" class="container-fluid">
		<div class="slds-grid slds-grid--align-center">
			<twitter:navbar />
		</div>
		<div class="slds-grid slds-grid--align-center">
			<twitter:statusbar />
		</div>
		<div class="slds-grid slds-grid--align-center">
			<twitter:tweetFeed />
		</div>
	</div>

	<twitter:simpleRoutedPath />
</aura:application>
