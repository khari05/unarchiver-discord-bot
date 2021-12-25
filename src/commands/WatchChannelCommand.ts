import { Client, CommandInteraction, GuildMember, ThreadChannel } from 'discord.js'
import { Command } from './Command'
import { ChannelWatcher } from '../ChannelWatcher'

export class WatchChannelCommand implements Command {
  readonly name = 'watch'
  readonly description = 'toggle archiving this channel'

  async execute (interaction: CommandInteraction, client: Client, watcher: ChannelWatcher): Promise<void> {
    if (interaction.member instanceof GuildMember && (interaction.member?.permissions.has('USE_PUBLIC_THREADS') ?? false)) {
      // needs to be able to use threads
      if (interaction.channel instanceof ThreadChannel) {
        // channel is a thread
        if (watcher.isWatching(interaction.channelId)) {
          watcher.removeChannel(interaction.channelId)
          await interaction.reply({ content: 'This channel will no longer be stopped from archiving', ephemeral: true })
        } else {
          watcher.addChannel(interaction.channelId)
          await interaction.reply({ content: 'This channel will now be stopped from archiving', ephemeral: true })
        }
      } else {
        await interaction.reply({ content: 'this channel is not a thread', ephemeral: true })
      }
    } else {
      await interaction.reply({ content: 'You don\'t have permission to run that command.', ephemeral: true })
    }
  }
}
