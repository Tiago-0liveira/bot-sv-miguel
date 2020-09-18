import * as Discord from "discord.js";

const client = new Discord.Client();
const prefix: string = "among";
let baseChannelId: string = "732717388226756639";
let muted: boolean = false;

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg: Discord.Message) => {
	if (!msg.content.startsWith(prefix) || msg.author.bot) {
		return;
	} else {
		msg.content = msg.content.replace(`${prefix} `, "");
	}

	if (msg.content === "setChannel") {
		if (msg.content.split(" ").length >= 1) {
			console.log(msg.content.split(" ")[1]);
			baseChannelId = msg.content.split(" ")[1];
		}
	} else if (msg.content === "togglemute") {
		const channel = msg.guild.channels.cache.find((c) => {
			console.log(String(c.id) === baseChannelId);
			return String(c.id) === baseChannelId;
		});
		channel.members.map((member) => member.voice.setMute(!muted));
		muted = !muted;
	} else if (msg.content === "boi") {
		console.log(msg.mentions);
	}
});

client.login("NzIyNDU2OTkwNTA0NDUyMTM3.XujWgQ.DSJG0WX0nQDCviy2o5yQ87ywzA4");