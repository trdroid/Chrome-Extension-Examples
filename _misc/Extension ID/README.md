# Extension IDs 

Each extension has a Global Unique Identifier of 32 characters to avoid conflicts with other extensions

The extension ID is used as the host because of which each extension gets its own unique origin. This isolates an extension from other extensions, web pages and the browser

The identifier is determined by the hash of the public key without the need for any central authority and
because public keys are randomly generated, the chance of a collision is extremely narrow

The extension ID of an unpackaged app would be different than a packaged app. Even with an unpackaged app, the ID would be different based on the folder it is loaded from. Use the *@@extension_id* predefined message to use the ID in the extension code, say for accessing an extension resource with the URL format chrome-extension://<extensionID>/<resource path>

After an extension is packed into a CRX file (by say, publishing it to the gallery), the generated permanent extension ID can be used to replace all occurrences of @@extension_id