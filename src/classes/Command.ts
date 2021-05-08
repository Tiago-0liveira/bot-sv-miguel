import { Collection, Guild, GuildMember, Message, MessageEmbed, User } from "discord.js"
import { prefix as GlobalPrefix, trustedUsersIds } from "../consts"

type deleteType = "after" | "never"
/**  
 * @class Command
 * @classdesc New Discord Chat Command
 * @method constructor
 * @method onCommand
 * @method ShowUsage
*/
export default class Command {
	alias: string[]
	label: string
	description: string
	usage: string
	needsPerms: boolean
	/**
	 * @method
	 * @private
	 * @param message Message
	 * @param author User
	 * @param member GuildMember
	 * @param Mentions Collection<string, GuildMember>
	 * @param Guild Guild
	 */
	private onCommand: (
		message: Message,
		author: User,
		member: GuildMember,
		Mentions: Collection<string, GuildMember>,
		Guild: Guild
	) => void
	prefix: string = GlobalPrefix
	deleteMessage: deleteType = "after"

	/**
	 * @constructor Command
	 * @param alias string[] —> command alia's
	 * @param label string —> command label
	 * @param description string -> command description
	 * @param usage string -> command usage
	 * @param needsPerms boolean —> needs perms to use command
	 * @param onCommand function —> function that is executed when command is called
	 * @param prefix string | default to GlobalPrefix —> command prefix
	 * @param deleteMessage deleteType | default to "after" —> when to delete message "before" | "after" | "never"
	 */
	constructor(
		alias: string[],
		label: string,
		description: string,
		usage: string,
		needsPerms: boolean,
		onCommand: (message: Message, author: User, member: GuildMember, Mentions: Collection<string, GuildMember>, Guild: Guild) => void,
		prefix: string = GlobalPrefix,
		deleteMessage: deleteType = "after"
	) {
		this.alias = alias
		this.label = label
		this.description = description
		this.usage = usage
		this.needsPerms = needsPerms
		this.onCommand = onCommand
		this.prefix = prefix
		this.deleteMessage = deleteMessage
	}

	/**
	 * @method Execute
	 * @description Executes the Command
	 * @param message Message
	 * @param author User
	 * @param member GuildMember
	 * @param Mentions Collection<string, GuildMember>
	 * @param Guild Guild
	 */
	execute(
		message: Message,
		author: User,
		member: GuildMember,
		Mentions: Collection<string, GuildMember>,
		Guild: Guild
	) {
		if ((this.needsPerms && trustedUsersIds.includes(author.id)) || !this.needsPerms) {
			this.onCommand(message, author, member, Mentions, Guild)
		} else {
			author.send(
				new MessageEmbed()
					.setColor("#FF4119")
					.addField("Error", "Not Enough Perms!")
			)
		}
		if (this.deleteMessage || (!trustedUsersIds.includes(author.id))) {
			try { message.deletable && message.delete() }
			catch (error) { console.error(error) }
		}
	}

	/**
	 * @method Usage
	 * @param member GuildMember
	 */
	ShowUsage(member: GuildMember) {
		member.send(
			new MessageEmbed()
				.addField("Usage", this.usage)
		)
	}
}