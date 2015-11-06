Browser Actions 
---------------
A Browser Action is an extension's UI with a simple button which is added to the main tool bar to the right of the Omni box.
They appear in the tool bar of every tab

A Browser Action extension can 
* Change the icon on the button depending on the content on the current page
* Animate the icon
* Display badges over icons 
* Show pop-up bubbles that are made with HTML and are sized dynamically based on the content

Page Actions 
------------
A Page Action is an extension's UI that resides in the Omni box. They selectively appear in the omni box based on the content of a page and can be toggled on or off for each tab

Page Actions can display pop ups but they do not support badges.

> NOTE: An extension can ONLY have one type of UI surface or the other

Content Scripts 
---------------
A Content Script is any arbitrary CSS and JavaScript that are injected into selected pages and executed similar to user scripts. It becomes part of the loaded page just like the user scripts. 

A Content Script uses in-page UI and takes up no UI in the browser. 

A Content Script has direct contact with web pages, but has less privileges when compared to a background page which has more privileges but is isolated from direct contact with web pages. 

A Content Script cannot directly modify the browser UI and the DOM of the HTML pages that are packaged with the extension like the UI and the background pages can. 

Background Pages
----------------
A background page is a regular HTML that runs invisibly in the background of the extension it is packaged with. It is the preferred part of the extension to hold the core logic, the JavaScript code that will be used to control the extension features across browser windows when its active. Additionally, it can also hold the state of the extension while the extension is active.  

*Categories*
* Persistent Background Pages
* Event Pages

####Persistent Background Pages

A Persistent Background Page is always open as it runs persistently in the background and could be resource intensive
	
It could be used to 	
* coordinate tasks across extension components and long running tasks
* manage state of an extension 

####Event Pages	

Event pages are loaded only when certain events to which they are registered with occur.

<hr>

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