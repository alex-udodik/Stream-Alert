const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require ("node-fetch");
const TwitchAPI = require('../twitch/channel-verify');
const AWS_API = require('../aws/aws-helper');

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
            
                console.log(`id: ${id}`);
                const message = await AWS_API.subscribeChannel(id);
                console.log(message);
                if (message === 'Subscribed') {
                    await interaction.editReply(
                        '```apache\n' + channelName + '\n```has been added to the system.'
                    );
                }
                else {
                    await interaction.editReply(
                        'Verification stage failed.'
                    );
                }
            }
        }
    }
}