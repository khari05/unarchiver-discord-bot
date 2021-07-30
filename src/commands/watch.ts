import { CommandInteraction, GuildMember, ThreadChannel } from 'discord.js'
import { Command } from '../command.js'
import { addChannel, disabled, removeChannel } from '../watching.js'

export const watchChannelCommand: Command = {
  name: 'watch',
  description: 'toggle archiving this channel',
  options: [],
  cmd: watchChannel
}

async function watchChannel (cmd: CommandInteraction): Promise<void> {
  if (cmd.member instanceof GuildMember && (cmd.member?.permissions.has('USE_PUBLIC_THREADS') ?? false)) {
    if (cmd.channel instanceof ThreadChannel) {
      if (disabled.includes(cmd.channelId)) {
        removeChannel(cmd.channelId)
        await cmd.reply({ content: 'This channel will no longer be stopped from archiving', ephemeral: true })
      } else {
        addChannel(cmd.channelId)
        await cmd.reply({ content: 'This channel will now be stopped from archiving', ephemeral: true })
      }
    } else {
      await cmd.reply({ content: 'this channel is not a thread', ephemeral: true })
    }
  } else {
    await cmd.reply({ content: 'You don\'t have permission to run that command.', ephemeral: true })
  }
}
