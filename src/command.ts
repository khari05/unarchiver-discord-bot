import { ApplicationCommand, ApplicationCommandOption, Client, CommandInteraction } from 'discord.js'
import { watchChannelCommand } from './commands/watch.js'
import { infoCommand } from './commands/info.js'
import { inviteCommand } from './commands/invite.js'

export interface Command {
  name: string
  description: string
  options: ApplicationCommandOption[]
  cmd: (cmd: CommandInteraction, client: Client) => Promise<void>
}

export async function matchSlashCommand (action: CommandInteraction, client: Client): Promise<void> {
  const command = commandMap.get(action.commandName)?.cmd
  if (command !== undefined) {
    await command(action, client)
  }
}

export const commandMap: Map<string, Command> = new Map()

export async function setCommands (client: Client): Promise<void> {
  if (commandMap.size === 0) {
    commandMap.set('info', infoCommand)
    commandMap.set('watch', watchChannelCommand)
    commandMap.set('invite', inviteCommand)
  }

  const promises: Array<Promise<ApplicationCommand> | undefined> = []
  if (client.application?.commands.cache.size === 0) {
    commandMap.forEach((c, n) => {
      promises.push(
        client.application?.commands.create({
          name: c.name,
          description: c.description,
          options: c.options
        })
      )
    })
    await Promise.all(promises)
  }
}
