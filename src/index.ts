import { Client, Intents, Interaction } from 'discord.js'
import { CommandManager } from './CommandManager'
import { ChannelWatcher } from './ChannelWatcher'

const client: Client = new Client({ intents: [Intents.FLAGS.GUILDS] })

const token: string | undefined = process.env.TOKEN
export const prefix: string = '/'

let commandManager: CommandManager
let watcher: ChannelWatcher

client.on('ready', () => {
  console.log(`successfully logged in as ${client?.user?.tag ?? 'error'}`)
  client.user?.setPresence({ activities: [{ name: `${client.guilds.cache.size} guilds | ${prefix}info`, type: 'WATCHING' }] })
  watcher = new ChannelWatcher()
  commandManager = new CommandManager(client, watcher)
})

client.on('guildCreate', (guild) => {
  client.user?.setPresence({ activities: [{ name: `${client.guilds.cache.size} guilds | ${prefix}info`, type: 'WATCHING' }] })
})

client.on('guildDelete', (guild) => {
  client.user?.setPresence({ activities: [{ name: `${client.guilds.cache.size} guilds | ${prefix}info`, type: 'WATCHING' }] })
})

client.on('interactionCreate', (interaction: Interaction) => {
  if (interaction.isCommand()) {
    commandManager.matchSlashCommand(interaction).catch((e: Error) => console.error(e.stack))
  }
})

client.on('threadUpdate', async (ot, nt) => {
  if ((nt.archived ?? false) && nt.manageable && !(nt.locked ?? false)) {
    if (watcher.isWatching(ot.id)) {
      await nt.setArchived(false)
    }
  }
})

client.login(token).catch((e: Error) => console.error(e.stack))
