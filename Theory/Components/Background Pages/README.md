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

###Event Pages	

https://developer.chrome.com/extensions/event_pages#registration