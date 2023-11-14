export interface Metadata {
	director_endpoint?: string;
	namespace_registration_endpoint?: string;
	jwks_uri?: string;
}

declare module '@pelicanplatform/web-client' {
	export default class Client {
		private readonly discoveryUrl: string;

		constructor(discoveryUrl: string);

		getMetadata(): Promise<Metadata>;

		getFile(path: string): Promise<void>;
	}

	export function downloadBlob(blobUrl: string, fileName: string): void;
}