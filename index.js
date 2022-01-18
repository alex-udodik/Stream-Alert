import DiscordJS, {Intents} from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
})

client.on('ready', () => {
    console.log("The bot is ready.");

    const guildId = process.env.GUILD_ID;
    const guild = client.guilds.cache.get(guildId);

    let commands
    
    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application?.commands
    }

    commands?.create({
        name: 'add',
        description: 'Subscribes a Twitch channel for live notifications.',
    })
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommands()) {
        return;
    }

    const { commandName, options } = interaction

    if (commandName === 'add') {
        interaction.reply({
            content: "test",
            ephemeral: true,
        })
    }
})

client.login(process.env.BOT_TOKEN);