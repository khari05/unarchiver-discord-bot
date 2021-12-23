import { Client, CommandInteraction } from 'discord.js'
import { ChannelWatcher } from '../ChannelWatcher'

export interface Command {
  name: string
  description: string
  execute: (cmd: CommandInteraction, client: Client, channelWatcher: ChannelWatcher) => Promise<void>
}
