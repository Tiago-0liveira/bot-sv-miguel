import * as Discord from "discord.js";

const client = new Discord.Client();
const prefix: string = "among";
const trustedUsersIds: string[] = ["194501538637414416", "263003910468272128"];
const tiagoId: string = "194501538637414416";
const serverId: string = "462955321695010816";
let baseChannelId: string = "732717388226756639";
let muted: boolean = false;
let isMuting: boolean = false;
let afkChannel: Discord.VoiceChannel;

const getMemberChannel = async (memberParam: Discord.GuildMember) => {
	const guild = await client.guilds.fetch("462955321695010816");
	let channel: Discord.VoiceChannel;
	guild.channels.cache.map((channel) => {
		if (channel.type === "voice") {
			channel.members.map((member) => {
				if (member.id === memberParam.id) {
					return channel;
				}
			});
		}
	});
};

client.on("ready", async () => {
	console.log(`Logged in as ${client.user.tag}!`);
	const guild = await client.guilds.fetch("462955321695010816");
	afkChannel = guild.afkChannel;
});

client.on("message", async (msg: Discord.Message) => {
	if (!msg.content.startsWith(prefix) || msg.author.bot) {
		if (msg.channel.type === "dm" && !msg.author.bot) {
			let embed: Discord.MessageEmbed = new Discord.MessageEmbed();
			embed.color = 3447003; /* Blue */
			msg.content
				? embed.addField(
						`Message From ${msg.author.username}`,
						msg.content,
						false
				  )
				: null;
			const memberTiago: Discord.GuildMember = client.guilds.cache
				.find((c) => String(c.id) === serverId)
				.members.cache.find((c) => String(c.id) === tiagoId);
			memberTiago.send(embed);
			return;
		} else {
			msg.content = msg.content.replace(`${prefix} `, "");
		}
	}
	if (msg.content.includes("setChannel")) {
		console.log("command: setChannel, raw --> " + msg.content);
		if (msg.content.split(" ").length >= 1) {
			baseChannelId = msg.content.split(" ")[1];
		}
	} else if (msg.content.includes("togglemute")) {
		console.log("command: togglemute, raw --> " + msg.content);
		if (!isMuting && msg.channel.id === "756649778481463326") {
			isMuting = true;
			msg.guild.channels.cache
				.find((c) => String(c.id) === baseChannelId)
				.members.map((member) => member.voice.setMute(!muted));
			muted = !muted;
			setTimeout(() => (isMuting = false), 2000);
		}
	} else if (msg.content.includes("boi")) {
		console.log("command: boi, raw --> " + msg.content);
		msg.content = msg.content.replace("boi ", "").trim();
		if (trustedUsersIds.includes(msg.author.id)) {
			msg.mentions.members.map((member) => {
				msg.content = msg.content
					.replace(`<@!${member.id}>`, "")
					.replace(`<@${member.id}>`, "");
			});
			msg.mentions.members.map(async (member) => {
				for (let int = 1; int <= 5; int++) {
					try {
						await member.send(
							msg.content
								? msg.content
								: "VEM PARA O SV DO MIGUEL PORA"
						);
					} catch (error) {
						let embed: Discord.MessageEmbed = new Discord.MessageEmbed();
						embed.color = 15158332; /* RED */
						embed.setTitle("ERROR");
						msg.channel.send(embed);
					}
				}
			});
		}
		const member: Discord.GuildMember = msg.guild.members.cache.find(
			(c) => c.id === msg.content.split(" ")[1]
		);
		msg.content = msg.content
			.replace(msg.content.split(" ")[1], " ")
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
			fetched.map((message) =>
				message.deletable ? message.delete() : ""
			);
		}
	} /* else if (msg.content.includes("move")) {
		console.log("command: move, raw --> " + msg.content);
		msg.content = msg.content.replace("cleanchat ", "").trim();
		const timeout: number = 500;
		let timer: number = 5000;
		let lastChannel: string;

		while (timer > 0) {
			await new Promise((r) => setTimeout(r, timeout));

			msg.mentions.members.map((member) => {
				member.voice.setChannel(getMemberChannel(member));
			});
			timer -= timeout;
		}
	} */
});

client.login("Token Here");
