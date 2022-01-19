const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require ("node-fetch");

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
            
            IF channel is valid, POST the channel_id/user_id to REST API on AWS
            REST API will trigger lambda function to subscribe the twitch channel for live notifications.
            Lambda functions should send JSON payload back to API which will return back to this discord bot.
            Send a success/error message to user.
        */

        await interaction.deferReply();

        var channel = {
            type: "subscribe",
            broadcaster_user_id: "my_channel_id",
        } 

        await fetch(process.env.SUBSCRIPTION_API_URL, {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(channel)
        }).then(res => {
            return res.json();
        }).then(function(body) {
            console.log(body)
        })

        await interaction.followUp({
            content: 'test123',
            ephemeral: true
        });
    }
}