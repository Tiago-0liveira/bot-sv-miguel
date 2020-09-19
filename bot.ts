import * as Discord from "discord.js";

const client = new Discord.Client();
const prefix: string = "among";
const trustedUsersIds: string[] = ["194501538637414416", "263003910468272128"];
let baseChannelId: string = "732717388226756639";
let muted: boolean = false;
let isMuting: boolean = false;

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg: Discord.Message) => {
	if (!msg.content.startsWith(prefix) || msg.author.bot) {
		return;
	} else {
		msg.content = msg.content.replace(`${prefix} `, "");
	}

	if (msg.content.includes("setChannel")) {
		console.log("command: setChannel, raw --> " + msg.content);
		if (msg.content.split(" ").length >= 1) {
			console.log(msg.content.split(" ")[1]);
			baseChannelId = msg.content.split(" ")[1];
		}
	} else if (msg.content.includes("togglemute")) {
		console.log("command: togglemute, raw --> " + msg.content);
		if (!isMuting && msg.channel.id === "756649778481463326") {
			isMuting = true;
			const channel: Discord.GuildChannel = msg.guild.channels.cache.find(
				(c) => String(c.id) === baseChannelId
			);
			channel.members.map((member) => member.voice.setMute(!muted));
			muted = !muted;
			setTimeout(() => (isMuting = false), 2000);
		}
	} else if (msg.content.includes("boi")) {
		console.log("command: boi, raw --> " + msg.content);
		msg.content = msg.content.replace("boi ", "").trim();
		if (
			trustedUsersIds.includes(msg.author.id) &&
			msg.mentions.members.size > 0
		) {
			console.log(msg.content);
			msg.mentions.members.map((member) => {
				msg.content = msg.content
					.replace(`<@!${member.id}>`, "")
					.replace(`<@${member.id}>`, "");
			});
			msg.mentions.members.map((member) => {
				for (let int = 1; int <= 5; int++) {
					member.send(
						msg.content
							? msg.content
							: "VEM PARA O SV DO MIGUEL PORA"
					);
				}
			});
		}
		const member: Discord.GuildMember = msg.guild.members.cache.find(
			(c) => c.id === msg.content.split(" ")[0]
		);
		msg.content = msg.content
			.replace(msg.content.split(" ")[0], " ")
			.trim();
		if (member !== undefined) {
			for (let int = 1; int <= 5; int++) {
				member.send(
					msg.content ? msg.content : "VEM PARA O SV DO MIGUEL PORA"
				);
			}
		}
	} else if (msg.content.includes("cleanchat")) {
		console.log("command: cleanchat, raw --> " + msg.content);
		msg.content = msg.content.replace("cleanchat ", "").trim();
		let fetched: Discord.Collection<string, Discord.Message>;
		try {
			fetched = await msg.channel.messages.fetch({
				limit: Number(msg.content),
			});
		} catch (error) {
			fetched = await msg.channel.messages.fetch({ limit: 20 });
		} finally {
			fetched.map((message) => message.deletable && message.delete());
		}
	}
});

client.login("NzIyNDU2OTkwNTA0NDUyMTM3.XujWgQ.MpDXKa2BV5pVQ6__kZfwldfx7uI");
