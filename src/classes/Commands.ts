import { Message } from "discord.js";
import Command from "./Command";

export default class Commands {
	private static registeredCommands: Command[] = []

	static registerCommand(command: Command) {
		Commands.registeredCommands.push(command)
	}

	static onNewMessage(message: Message) {
		Commands.registeredCommands.forEach(command => {
			command.alias.some((
				alias => message.content.replace(command.prefix + " ", "").startsWith(alias)
			)) && command.execute(
				message,
				message.author,
				message.member,
				message.mentions.members,
				message.guild
			)
		})
	}
}