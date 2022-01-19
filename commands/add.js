const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require ("node-fetch");
const TwitchAPI = require('../twitch/channel-verify');

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
            IF channel is valid, POST the channel_id/user_id to REST API on AWS
            REST API will trigger lambda function to subscribe the twitch channel for live notifications.
            Lambda functions should send JSON payload back to API which will return back to this discord bot.
            Send a success/error message to user.
        */

        await interaction.deferReply({ ephemeral: true });

        const channelName = interaction.options.getString('channelname');
        const id = await TwitchAPI.verifyChannelName(channelName);

        if (id === 'invalid') {
            await interaction.editReply(
                'Unable to find: ```fix\n' + channelName + '\n```from the Twitch API. Please make sure the name is spelled correctly.');
        }
        else {

            const channelSubscribedAlready = await TwitchAPI.verifyChannelIsSubscribed(id);
            
            if (channelSubscribedAlready) {
                await interaction.editReply(
                    '```apache\n' + channelName + '\n```is already in the system.');
            }
            else {
            /*
            var channel = {
                type: "subscribe",
                broadcaster_user_id: channelName,
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
                */
                await interaction.editReply("test123");
            }
            
        }
    }
}