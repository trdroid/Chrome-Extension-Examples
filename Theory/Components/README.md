### Extension Message Passing

Extension Message Passing allows different components of an extension to communicate with each other

In order to modify the UI or access an extension API, the Content Script can send messages to the parent extension to get the work done by the pages (the privileged parts) of the extension. Similarly, a UI page or a background page can send messages to a content script to perform actions on the web page.

Usually, message passing is used to send messages between a content script and a background page, but it can be used to enable communication between any two pages in the extension.

An extension can communicate with another extension, provided it knows the ID of the extension it tries to send messages to. 

NOTE: UI pages can share information by manipulating properties on their DOMs and also by invoking functions on background pages.

*Flow*

Consider a scenario where a page action for maps has to appear in the omni box if a web page contains an address.

Use a content script to examine the content of a web page for an address

If an address is found, the content script sends a message using 
```javascript
chrome.extension.sendRequest(message) 
```
to a background page to update the UI of the browser to display a page action in the omni box. In the background page, messages can be received using 

```javascript
  chrome.extension.onRequest.addListener(function(feeds, sender, sendResponse) {
	
  });
```