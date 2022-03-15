import {
	Client,
	Collection,
	GuildMember,
	VoiceState,
	Message,
	MessageEmbed,
	Channel
} from "discord.js";
import { baseChannelIds, salaProBotID, TOKEN } from "./consts";
import Commands from "./classes/Commands"
import Command from "./classes/Command"

const client = new Client();

let muted: boolean = false;
let isMuting: boolean = false;
let MembersToWatch: string[] = []

function kickUsers(users: Collection<string, GuildMember>) {
	users.forEach((user: GuildMember) => user.voice.kick())
}

client.on("ready", async () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.addListener("voiceStateUpdate", async (_: any, newState: VoiceState) => {
	if (MembersToWatch.includes(newState.member.id)) {
		newState.member.voice.kick()
	}
})
Commands.registerCommand(new Command(["togglemute"], "amongUsTogglemute", "Among Us Toggle Mute", "among togglemute", true, (
	message
) => {
	console.log("command: togglemute, raw --> " + message.content);
	message.content = message.content.trim().replace("among togglemute", "")
	isMuting = true;

	message.guild.channels.cache
		.find((c) => message.member.voice.channel.id === c.id)
		.members.map((member) => member.voice.setMute(!muted));

	muted = !muted;
	setTimeout(() => (isMuting = false), 2000);
}))
Commands.registerCommand(new Command(["boi"], "sendMessages", "Bulk Messaging", "among boi <member_id> ?<message>", true, (
	message, _, __, Mentions, Guild
) => {
	console.log("command: boi, raw --> " + message.content);
	message.content = message.content.replace("boi ", "").trim();
	Mentions.map((member) => {
		message.content = message.content
			.replace(`<@!${member.id}>`, "")
			.replace(`<@${member.id}>`, "");
	});
	Mentions.map(async (member) => {
		for (let int = 1; int <= 5; int++) {
			try {
				await member.send(
					message.content.trim()
						? message.content
						: "VEM PARA O SV PORA"
				);
			} catch (error) {
				let embed: MessageEmbed = new MessageEmbed();
				embed.color = 15158332; // Red
				embed.setTitle("ERROR");
				message.channel.send(embed);
			}
		}
	});
	const ChosenMember: GuildMember = Guild.members.cache.find(
		(c) => c.id === message.content.split(" ")[1]
	);
	message.content = message.content
		.replace(message.content.split(" ")[1], " ")
		.trim();
	if (ChosenMember !== undefined) {
		for (let int = 1; int <= 5; int++) {
			ChosenMember.send(
				message.content ? message.content : "VEM PARA O SV DO MIGUEL PORA"
			);
		}
	}
}))
Commands.registerCommand(new Command(["cleanchat"], "cleanChat", "Clean Chat Messages", "among cleanchat ?<amount|max:100>", true, async (
	message, author, member, Mentions, Guild
) => {
	console.log("command: cleanchat, raw --> " + message.content);
	message.content = message.content.replace("cleanchat ", "").trim();
	let fetched: Collection<string, Message>;
	try {
		const max = Number(message.content)
		fetched = await message.channel.messages.fetch({
			limit: Number(message.content) > 40 ? 40 : Number(message.content),
		});
	} catch (error) {
		fetched = await message.channel.messages.fetch({ limit: 10 });
	} finally {
		fetched.map((message) =>
			message.deletable && message.delete()
		);
	}
}))
Commands.registerCommand(new Command(["move"], "move", "continuously moves someone channel", "among move <member_id> ?<seconds>", true, async (
	message, author, _, __, Guild
) => {
	console.log("command: move, raw --> " + message.content);
	message.content = message.content.replace("among move ", "").trim();
	const member: GuildMember = Guild.members.cache.find(
		(member) => {
			if (member.id === message.content.split(" ")[0]) {
				message.content = message.content.replace(message.content.split(" ")[0], "").trim()
				return true
			}
		}
	)
	if (!member) {
		const embed = new MessageEmbed()
			.setColor("#FF4119")
			.addField("Error", "Unknown User Id")
		let sentMessage: Message;
		message.channel.send(embed).then(data => { sentMessage = data; message.deletable && message.delete() }).catch((reason => console.log(`146|${reason}`)))
		return setTimeout(() => {
			sentMessage.deletable && sentMessage.delete()
		}, 3 * 1000);
	}
	const timeout: number = 500;
	let timer: number = 4000;
	let BeginningChannel: Channel;
	let afkChannel: string;
	try {
		BeginningChannel = member.voice.channel;
		afkChannel = baseChannelIds[Guild.id].afkChannel;
		if (!isNaN(Number(message.content)) && Number(message.content) && Number(message.content) < 20) {
			timer = Number(message.content) * 1000
		}
	} catch (error) {
		console.log("ERROO")
		console.log(error)
	}
	try {
		while (timer > 0) {
			await new Promise((r) => setTimeout(r, timeout));
			if ((member.voice.channel === BeginningChannel) || (member.voice.channel.id === salaProBotID)) {
				member.voice.setChannel(afkChannel)
			} else if (member.voice.channel.id === afkChannel) {
				member.voice.setChannel(salaProBotID)
			}
			timer -= timeout;
		}
	} catch (error) {
		console.log("ERROOOOOO")
		console.log(error)
	} finally {
		member.voice.setChannel(BeginningChannel)
	}
}))
Commands.registerCommand(new Command(["dc"], "disconnect", "disconnects everyone from channel", "among dc ?<channel_id>", true, (
	message, _, member
) => {
	console.log("command: dc, raw --> " + message.content);
	message.content = message.content.trim().replace("among dc", "")

	if (!message.content) {
		kickUsers(member.voice.channel.members)
	} else {
		const authorChannel = message.guild.channels.cache.find(channel => channel.id == message.content)
		if (authorChannel) kickUsers(authorChannel.members)
	}
}))
Commands.registerCommand(new Command(["watch"], "watch", "watches someone (impossible to reconnect to channel)", "among watch ?<member_id>", true, (
	message, author
) => {
	console.log("command: watch, raw --> " + message.content)
	message.content = message.content.trim().replace("among watch ", "")

	if (!message.content) {
		const embed = new MessageEmbed()
			.addField("Wrong Format", "format -> among watch <member_id> ?stop")
			.setColor("#FF4119")
		author.send(embed)
	} else {
		if (message.content.includes("stop")) {
			const member_id = message.content.split(" ")[0]
			MembersToWatch.filter(id => id !== member_id)
		}
		const member_id = message.content.split(" ")[0]
		const member = message.guild.members.cache.find(m => m.id === member_id)
		member && member.voice.kick()
		MembersToWatch.push(member_id)
	}
}))

Commands.registerCommand(new Command(["ban"], "ban", "ban's someone", "among ban <member_id>", true, async (
	message,author, member, mentions, g
) => {
	const SplittedContent = message.content.split(" ")
	if (SplittedContent.length < 3) {
		const embed = new MessageEmbed()
			.addField("Error", "format -> among ban <member_id>")
			.setColor("#FF4119")
		return author.send(embed)
	}
	const id = SplittedContent[2]
	const memberToBan = await g.members.fetch(id)
	if (memberToBan) {
		memberToBan.ban()
	} else {
		const embed = new MessageEmbed()
			.addField("Error", `No member with ${id} id found!`)
			.setColor("#FF4119")
		author.send(embed)
	}
}))

Commands.registerCommand(new Command(["persistServerMute, psm"], "persistServerMute", "make's it impossible to de-activate the server mute", "among psm <member_id>", true, (
	message, author, member, Mentions, Guild
) => {
	const SplittedContent = message.content.split(" ")
	

	
}))
Commands.registerCommand(new Command(["commands", "help"], "help", "shows all commands", "among help/commands", true, (
	_, author
) => {
	author.send(new MessageEmbed()
		.setColor("#0984e3")
		.addField("togglemute -> toggles everyone mute", "```among togglemute```")
		.addField("boi -> bulk messaging", "```among boi <member_id> ?<message>```")
		.addField("move -> constantly move someone", "```among move <member_id> ?<seconds>```")
		.addField("dc -> disconnects everyone from channel", "```among dc <channel_id>```")
		.addField("watch -> doesnt allow someone to join voice channels", "```among watch <member_id> ?stop```")
	)
}))

client.on("message", Commands.onNewMessage)
client.login(TOKEN);
