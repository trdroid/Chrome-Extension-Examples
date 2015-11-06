#Background Pages

A background page is a regular HTML that runs invisibly in the background of the extension it is packaged with. It is the preferred part of the extension to hold the core logic, the JavaScript code that will be used to control the extension features across browser windows when its active. Additionally, it can also hold the state of the extension while the extension is active.  

*Categories*
* Persistent Background Pages
* Event Pages

###Persistent Background Pages

A Persistent Background Page is always open as it runs persistently in the background and could be resource intensive
	
It could be used to 	
* coordinate tasks across extension components and long running tasks
* manage state of an extension 

#Event Pages	

### When is an event page loaded?

Event Pages are loaded when needed and stay running as long as they is active.

Some examples of when an event page is loaded are when
* an extension is installed or updated (the event page is loaded to register for events)
* an event that the event page was listening to was dispatched
* a content script or another extension sends a message
* another view in the extension (eg. a popup) calls runtime.getBackgroundPage

Questions 

~~~~~~~~~~

Does an extension register for events WITHIN an event page?


### When is an event page unloaded?

An event page will be unloaded when 
* idle for few seconds
* all visible windows like popups are closed
* all message ports are closed

When an event page has to be unloaded, Chrome dispatches a *runtime.onSuspend* event, at which point the event page gets a few more seconds to handle this event before it is forcibly unloaded. If during this time, an event that would cause the event page to be loaded occurs, the suspension is cancelled and a *runtime.onSuspendCanceled* event is dispatched

An occurrence of any one of the events that 

Event Registration 
------------------
An extension can register with Chrome to be notified when certain events occur by adding event listeners using *addListener*. When Chrome detects a registered event, it dispatches the event to the extension and loads the event page. As the event listeners only exist in the context of the event page, they should be added each time the event page loads

When an extension unregisters all its event listeners for an event by calling *removeListener*, Chrome no longer loads the event page for that event. 

https://developer.chrome.com/extensions/event_pages#registration
