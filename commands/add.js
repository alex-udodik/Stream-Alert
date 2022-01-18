const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('Subscribes a Twitch channel for live notifications.')
        .addStringOption(option =>
            option
                .setName('channelname')
                .setDescription('Example: summit1g')
                .setRequired(true)
        ),

    async execute(interaction) {

        //TODO: 
        /* 
            GET request from twitch api and check if valid twitch channel.
            IF channel is not valid, reply back with a "channel not found message"
            
            IF channel is valid, send the channel_id/user_id to REST API on AWS
            REST API will trigger lambda function to subscribe the twitch channel for live notifications.
            Lambda functions should send JSON payload back to API which will return back to this discord bot.
            Send a success/error message to user.
        */

        interaction.reply({
            content: 'test123',
            ephemeral: true
        });
    }
}