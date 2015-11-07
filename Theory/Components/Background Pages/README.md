#Background Pages

*Categories*
* Persistent Background Pages
* Event Pages

##Persistent Background Pages

A background page runs invisibly in an extension process to carry out long running tasks and maintain the state of an extension. It is always open. It is the ideal part of an extension to hold the core logic and the state of an extension. 

An ideal approach is to design the UI of an extension (browser actions, page actions, options pages and other HTML pages) as dumb views that coordinate with a background page. A background page could hold the state of an extension and notify state changes to the views to reflect the changes the UI.

Only one instance of a background page can run in an extension process, but an extension using incognito split mode gets another instance for the incognito windows. 

###Manifest

*To register an HTML page*

```javascript
{
	"name": "MyExtension"
	
	"background": {
		"page": "a_background_page.html"
	}
}
```


*To register scripts*

In the following case, the extension system generates a background html page including the scripts mentioned in the "scripts" attribute

```javascript
{
	"name": "MyExtension"
	
	"background": {
		"scripts": ["a_background_script.js"]
	}
}
```

For detailed information, refer to https://developer.chrome.com/extensions/background_pages

##Event Pages	

### When is an event page loaded?

Event Pages are loaded when needed and stay running as long as they is active.

Some examples of when an event page is loaded are when
* an extension is installed or updated (the event page is loaded to register for events)
* an event that the event page was listening to was dispatched
* a content script or another extension sends a message
* another view in the extension (eg. a popup) calls runtime.getBackgroundPage

### When is an event page unloaded?

An event page will be unloaded when 
* idle for few seconds
* all visible windows like popups are closed
* all message ports are closed

When an event page has to be unloaded, Chrome dispatches a *runtime.onSuspend* event, at which point the event page gets a few more seconds to handle this event before it is forcibly unloaded. If during this time, an event that would cause the event page to be loaded occurs, the suspension is cancelled and a *runtime.onSuspendCanceled* event is dispatched

Event Registration 
------------------
An extension can register with Chrome to be notified when certain events occur by adding event listeners using *addListener*. When Chrome detects a registered event, it dispatches the event to the extension and loads the event page. As the event listeners only exist in the context of the event page, they should be added each time the event page loads

When an extension unregisters all its event listeners for an event by calling *removeListener*, Chrome no longer loads the event page for that event. 

For detailed information, refer to https://developer.chrome.com/extensions/event_pages
