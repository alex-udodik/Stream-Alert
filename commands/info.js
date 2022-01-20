const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const TwitchAPI = require('../twitch/channel-verify');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Shows all Twitch channels that have been added.'),

    async execute(interaction) {

        await interaction.deferReply({ ephemeral: true });

        const data = await TwitchAPI.getChannelSubscriptions();

        const size = data.data.length

        var url = [`https://api.twitch.tv/helix/users?id=${data.data[0].condition.broadcaster_user_id}`];

        for (var i = 1; i < size; i++) {
            url.push(`&id=${data.data[i].condition.broadcaster_user_id}`);
        }

        var users_url = url.join("");
        
        const channelsResponse = await TwitchAPI.getChannels(users_url);

        var channels = [];
        var channelsSize = channelsResponse.data.length

        for (var i = 0; i < channelsSize; i++) {
            channels.push(channelsResponse.data[i].display_name);
        }

        channels.sort(function (a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        });
        const description = channels.join("\n");

        const embed = {
            title: "Current Twitch Channels",
            description: description,
            color: 0x9146FF
        }
            
        await interaction.editReply({
            embeds: [ embed ],
            ephemeral: true
        });
    }
}