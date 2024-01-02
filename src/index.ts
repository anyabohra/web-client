import { Metadata } from "./index.d";


export default class Client {

	private readonly discoveryUrl: string;

	constructor(discoveryUrl: string) {
		this.discoveryUrl = discoveryUrl
	}

	async getMetadata() : Promise<Metadata> {
		const metadataEndpoint = `${this.discoveryUrl}/.well-known/pelican-configuration`

		let res = await fetch(metadataEndpoint)

		if(res.status !== 200){
			throw new Error(`Metadata endpoint returned ${res.status}: ` + metadataEndpoint)
		}

		try {
			return await res.json() as Metadata
		} catch(e) {
			throw new Error(`Metadata endpoint returned invalid JSON: ` + metadataEndpoint)
		}
	}

	async getFile(path: string) : Promise<void> {
		const metadata = await this.getMetadata()

		if (!metadata.director_endpoint) {
			throw new Error("Metadata does not contain director_endpoint")
		}

		let url = `${metadata.director_endpoint}${path}`

		exports.downloadUrl(url)
	}
}

export function downloadUrl(url: string, download: string = "") {
	let a = document.createElement("a")
	a.setAttribute('href', url)
	a.setAttribute("download", download)
	a.setAttribute('target', "_blank")
	a.style.display = 'none';
	a.click()
}
