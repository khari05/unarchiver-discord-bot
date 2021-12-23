import { ApplicationCommand, Client, CommandInteraction } from 'discord.js'
import { ChannelWatcher } from './ChannelWatcher'
import { Command } from './commands/Command'
import { InfoCommand } from './commands/InfoCommand'
import { InviteCommand } from './commands/InviteCommand'
import { WatchChannelCommand } from './commands/WatchChannelCommand'

export class CommandManager {
  private readonly commandMap: Map<string, Command> = new Map()

  constructor (private readonly client: Client, private readonly watcher: ChannelWatcher) {
    if (this.commandMap.size === 0) {
      this.commandMap.set('info', new InfoCommand())
      this.commandMap.set('invite', new InviteCommand())
      this.commandMap.set('watch', new WatchChannelCommand())
    }

    const promises: Array<Promise<ApplicationCommand> | undefined> = []
    if (client.application?.commands.cache.size === 0) {
      this.commandMap.forEach((c, n) => {
        promises.push(
          client.application?.commands.create({
            name: c.name,
            description: c.description,
            options: []
          })
        )
      })
      Promise.all(promises).catch((e: Error) => console.error(e.stack))
    }
  }

  async matchSlashCommand (action: CommandInteraction): Promise<void> {
    const command = this.commandMap.get(action.commandName)
    if (command !== undefined) {
      await command.execute(action, this.client, this.watcher)
    }
  }
}
