import { Client, CommandInteraction } from 'discord.js'
import { Command } from './Command'

export class InviteCommand implements Command {
  readonly name = 'invite'
  readonly description = 'Get the invite link for the bot'

  async execute (cmd: CommandInteraction, client: Client): Promise<void> {
    await cmd.reply({
      content: `https://discord.com/api/oauth2/authorize?client_id=${client.user?.id ?? ''}&permissions=17179871232&scope=bot%20applications.commands`,
      ephemeral: true
    })
  }
}
