const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require ("node-fetch");
const TwitchAPI = require('../twitch/channel-verify');
const AWS_API = require('../aws/aws-helper');
const DynamoDB = require('../aws/dynamoDB');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('Unsubscribes a Twitch channel from live notifications.')
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
                //fetch subscription id from dynamodb

                const subscription_id = await DynamoDB.fetchSubscriptionID(id);
                console.log("sub id: " + subscription_id);
                await interaction.editReply(
                    'Preparing to remove channel.'
                );
            }
            else {
                await interaction.editReply(
                    '```fix\n' + channelName + '\n```is not subscribed for live notifications.'
                );
            }
        }
    }
}