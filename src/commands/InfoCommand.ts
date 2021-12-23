import { CommandInteraction } from 'discord.js'
import { Command } from './Command'

export class InfoCommand implements Command {
  readonly name = 'info'
  readonly description = 'Shows the info menu'

  async execute (cmd: CommandInteraction): Promise<void> {
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
}
