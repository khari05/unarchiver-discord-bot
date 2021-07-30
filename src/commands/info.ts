import { CommandInteraction } from 'discord.js'
import { Command } from '../command.js'

export const infoCommand: Command = {
  name: 'info',
  description: 'Shows the info menu',
  options: [],
  cmd: info
}

async function info (cmd: CommandInteraction): Promise<void> {
  await cmd.reply({
    embeds: [{
      title: 'Unarchiver',
      description: 'just run /watch and this bot will always keep your channel open.',
      color: '#5f6e85',
      timestamp: new Date()
    }],
    ephemeral: true
  })
}
