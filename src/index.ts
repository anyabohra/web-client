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

		if(!metadata.director_endpoint){
			throw new Error("Metadata does not contain director_endpoint")
		}

		let url = `${metadata.director_endpoint}${path}`
		let response = await fetch(url, {redirect: "follow"})

		if(response.status !== 200){
			throw new Error(`Cache endpoint returned ${response.status}: ` + url)
		}

		try {
			const blob = await response.blob()
			let blobUrl = window.URL.createObjectURL(blob);
			let fileName = path.split("/").pop() || "file.txt"
			await exports.downloadBlob(blobUrl, fileName)
		} catch (e) {
			throw new Error(`Cache endpoint returned invalid data: ` + url)
		}
	}
}

export function downloadBlob(blobUrl: string, fileName: string) {
	let a = document.createElement("a")
	a.setAttribute('href', blobUrl)
	a.setAttribute("download", fileName)
	a.style.display = 'none';
	a.click()
}
