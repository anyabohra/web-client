# Pelican Web Client

[NPM](https://www.npmjs.com/package/@pelicanplatform/web-client)
[Github](https://github.com/PelicanPlatform/web-client)

## Installation

```shell
npm i @pelicanplatform/web-client
```

## Usage

```javascript
import Client from "@pelicanplatform/web-client";

const discoveryUrl = "https://osg-htc.org" // Example discovery URL used for OSDF
const filePath = "/example/file/path.txt" // Example file path

const webClient = new Client(discoveryUrl);

try {
	webClient.getFile(filePath) // Downloads file to path.txt
} catch (e) {
	pass
}
```

Example usage can be found here: 

https://github.com/PelicanPlatform/web-client/blob/main/src/app/page.tsx
