const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Shows all Twitch channels that have been added.'),

    async execute(interaction) {

        //TODO: 
        /* 
            Connect to DyanmoDB database and fetch list of all channels (Database won't be big).
            Format the results and send back as an embedded message.
        */
        
        interaction.reply({
            content: 'test123',
            ephemeral: true
        });
    }
}