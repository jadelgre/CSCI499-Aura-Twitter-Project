({
	getTimestamp : function() {
		var date = new Date();
		var dateString = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + " " + date.getHours()+ ":" + date.getMinutes() + ":" + date.getSeconds();
		return dateString;
	}
})