import { Client, Intents, Interaction } from 'discord.js'
import { matchSlashCommand, setCommands } from './command.js'
import { disabled } from './watching.js'

const client: Client = new Client({ intents: [Intents.FLAGS.GUILDS] })

const token: string | undefined = process.env.TOKEN
export const prefix: string = '/'

client.on('ready', () => {
  console.log(`successfully logged in as ${client?.user?.tag ?? 'error'}`)
  client.user?.setPresence({ activities: [{ name: `${client.guilds.cache.size} guilds | ${prefix}help`, type: 'WATCHING' }] })
  setCommands(client)
    .catch((e: Error) => console.error(e.stack))
})

client.on('guildCreate', (guild) => {
  client.user?.setPresence({ activities: [{ name: `${client.guilds.cache.size} guilds | ${prefix}help`, type: 'WATCHING' }] })
})

client.on('guildDelete', (guild) => {
  client.user?.setPresence({ activities: [{ name: `${client.guilds.cache.size} guilds | ${prefix}help`, type: 'WATCHING' }] })
})

client.on('interactionCreate', (interaction: Interaction) => {
  if (interaction.isCommand()) {
    matchSlashCommand(interaction, client).catch((e: Error) => console.error(e.stack))
  }
})

client.on('threadUpdate', async (ot, nt) => {
  if ((nt.archived ?? false) && nt.manageable && !(nt.locked ?? false)) {
    if (disabled.includes(nt.id)) {
      await nt.setArchived(false)
    }
  }
})

client.login(token).catch((e: Error) => console.error(e.stack))
