# Packaging 

Chrome Extensions are packaged into CRX files. 

Extensions are just like web pages that Chrome runs in sub-processes.

Each extension is associated with a public/private key pair. 

> CRX file = Public Key  |  signature | Zipped Extension Content 
  							
> Zipped Extension Content = Zip(Extension folder's content)

> Signature = Zipped Content signed with the private key