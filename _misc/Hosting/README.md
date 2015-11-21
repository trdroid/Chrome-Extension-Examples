### Hosting on the Chrome Extensions Gallery

An extension can be submitted to the gallery using the Chrome Developer Dashboard.

The gallery requires an extension to be uploaded as a zip file. On publishing, a CRX file is generated from the zip file

To release a new version of the extension, just upload the new source files to the gallery

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

When installing an extension (the CRX file), Chrome extracts the public key, the signature and the zipped contents, verifies that the signature is valid using the public key, reads the manifest file and integrates the extension into the browser

For this reason, Chrome can fetch CRX files over a plain non-ssh connection because it would 
check the signature inside the CRX file before installing it

### Updating an Extension

When hosted on the gallery, publishing an updated extension would suffice and the gallery would take care of 
auto updating the extension 

When self-hosted, providing an update_url in the manifest file would suffice. 