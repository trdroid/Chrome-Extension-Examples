var counter = 0;

$(function() {
	$('#clickDiv').click(function() {
		alert("Hello World! from alert");
		counter++;
		chrome.browserAction.setBadgeText({"text": counter.toString()});
	});
}); 