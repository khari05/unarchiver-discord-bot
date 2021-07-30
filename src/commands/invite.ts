import { Client, CommandInteraction } from 'discord.js'
import { Command } from '../command.js'

export const inviteCommand: Command = {
  name: 'invite',
  description: 'Get the invite link for the bot',
  options: [],
  cmd: invite
}

async function invite (cmd: CommandInteraction, client: Client): Promise<void> {
  await cmd.reply({
    content: `https://discord.com/api/oauth2/authorize?client_id=${client.user?.id ?? ''}&permissions=17179871232&scope=bot%20applications.commands`,
    ephemeral: true
  })
}
