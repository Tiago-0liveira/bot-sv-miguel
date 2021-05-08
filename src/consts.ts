import * as dotenv from "dotenv";
import { default as config } from "./config.json"
dotenv.config();

export const TOKEN = process.env.TOKEN
export const prefix: string = "among";
export const GAME_STUFF_ID = "296980436180008961"
export const salaProBotID = "834484043378065499"
export const tiagoId: string = "194501538637414416";
export const serverId: string = "462955321695010816";
export const trustedUsersIds: string[] = config.trustedUsers.map(User => User.id);
export let baseChannelIds: { [key: string]: { mainchannel: string, afkChannel: string } } = {
	"296980436180008961": {/* SV GAMES STUFF */
		mainchannel: "359411833972719627",
		afkChannel: "296981603001827339"
	}
};