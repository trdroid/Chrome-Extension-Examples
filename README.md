# Chrome Extensions 

### CRX Files

Chrome Extensions are packaged into CRX files. 

Extensions are just like web pages and Chrome runs them in sub-processes just like it does for web pages.

Each extension is associated with a public/private key pair. 

> CRX file = Public Key  |  signature | Zipped Extension Content 
  							
> Zipped Extension Content = Zip(Extension folder's content)

> Signature = Zipped Content signed with the private key

Extension Folder's content could be 
* manifest.json (is a MUST and it should be called that ONLY)
* background.html 
* content_scripts.js
* JavaScript libraries
* images 
* Flash movies etc.

NOTE: The HTML pages cannot contain embedded scripts

### Extension IDs 

Each extension has a Global Unique Identifier of 32 characters to avoid conflicts with other extensions

The extension ID is used as the host because of which each extension gets its own unique origin. This isolates an extension from other extensions, web pages and the browser

The identifier is determined by the hash of the public key without the need for any central authority and
because public keys are randomly generated, the chance of a collision is extremely narrow


### Hosting on the Chrome Extensions Gallery

The gallery requires an extension to be uploaded as a zip file. On publishing, a CRX file is generated from the zip file

To release a new version of the extension, login, upload new source files and hit the publish button

The gallery
* Creates and stores the private key of the extension
* Takes care of Auto updates


### Self Hosting an Extension

To self host an extension, create a CRX file with the pack extension button on the extensions management 
page in Chrome 

Include an update_url entry in the manifest file

manifest.json 

```json
{
  ...
  "update_url": "http://mydomain.com/myextension.xml"
  ...
}
```

On providing the update_url, Chrome checks the URL every few hours for an XML file which lists 
the most recent version of the extension and where it should be downloaded from. 

On self hosting an extension, make sure that the
* Private key is protected
* New versions of the extension are signed with the same private key as the previous one


### Installing an Extension 

When installing an extension (the CRX file), Chrome extracts the public key, the signature and the zipped contents 
and verifies that the signature is valid using the public key

For this reason, Chrome can fetch CRX files over a plain non-ssh connection because it would 
check the signature inside the CRX file before installing it


### Updating an Extension

When hosted on the gallery, publishing an updated extension would suffice and the gallery would take care of 
auto updating the extension 

When self-hosted, providing an update_url in the manifest file would suffice. 

###Types of Extensions
* Browser Actions
* Page Actions
* Content Scripts

Browser Actions 
---------------
A Browser Action is an extension's UI with a simple button which is added to the main tool bar to the right of the Omni box. 
They appear in the tool bar of every tab

The extension can 
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

### Extension Message Passing

Extension Message Passing allows different components of an extension to communicate with each other

In order to modify the UI or access an extension API, the Content Script can send messages to the parent extension to get the work done by the pages (the privileged parts) of the extension. Similarly, a UI page or a background page can send messages to a content script to perform actions on the web page.

Usually, message passing is used to send messages between a content script and a background page, but it can be used to enable communication between any two pages in the extension.

An extension can communicate with another extension, provided it knows the ID of the extension it tries to send messages to. 

*Flow*

Consider a scenario where a page action for maps should appear in the omni box if a web page contains an address.

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

<hr>

Background Pages
----------------
A background page is a regular HTML that runs invisibly in the background of the extension it is packaged with. It is the preferred part of the extension that should contain the core logic. Additionally, it can also hold the state of the extension while the extension is active.  

<hr>

# Extension API

<b>*chrome*</b> is the name of the top level object

The extensions API is organized into the following modules. 
 
<b>chrome.extension.*</b>

    Enables communication between extension components by sending messages
  
    Resolves URLs of the extension files

<b>chrome.browserAction.*</b> 

    Allows setting appearance of Browser Actions and their badges

<b>chrome.pageAction.*</b>  

    Allows enabling and disabling Page Actions

<b>chrome.windows.*</b> 

    Allows opening, closing, looking up and updating browser windows
  
    requires tabs permission

<b>chrome.tabs.*</b> 

    requires tabs permission

<b>chrome.bookmarks.*</b> 

    Allows reading from and writing to the users' bookmarks tree
  
    requires bookmarks permission
  
For more information on Extensions API, refer to https://developer.chrome.com/extensions/api_index

### Debugging an extension

Visit chrome-extension://<extension ID>/<html-page-of-extension>.html and inspect element












