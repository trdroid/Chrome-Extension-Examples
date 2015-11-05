# Chrome Extensions 

### CRX Files

Chrome Extensions are packaged into CRX files. 

Each extension is associated with a public/private key pair. 

> CRX file = Public Key  |  signature | Zipped Extension Content 
  							
> Zipped Extension Content = Zip(Extension folder's content)

> Signature = Zipped Content signed with the private key


### Extension IDs 

Each extension has a Global Unique Identifier of 32 characters to avoid conflicts with other extensions. 

The identifier is determined by the hash of the public key without the need for any central authority and
because public keys are randomly generated, the chance of a collision is extremely narrow. 


### Hosting on the Chrome Extensions Gallery

On publishing an extension to the gallery, its CRX file is generated 

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

When hosted on the gallery, providing an updated extension would suffice and the gallery would take care of 
auto updating the extension 

When self-hosted, providing an update_url in the manifest file would suffice. 













