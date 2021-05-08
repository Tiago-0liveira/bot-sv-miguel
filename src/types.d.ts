declare module "config.json" {
	const value: {
		trustedUsers: { id: string, name: string }[]
	};
	export default value;
}
