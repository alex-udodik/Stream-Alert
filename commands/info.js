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

        const size = data.length

        if (size === 0) {
            const embed = {
                title: "Current Twitch Channels",
                description: "",
                color: 0x9146FF,
                footer: {
                    text: `Total: 0`
                }
            }
                
            await interaction.editReply({
                embeds: [ embed ],
                ephemeral: true
            });
            return;
        }
        else {
            var url = [`https://api.twitch.tv/helix/users?id=${data[0]}`];

            for (var i = 1; i < size; i++) {
                if (data[i].status !== 'webhook_callback_verification_failed') {
                    url.push(`&id=${data[i]}`);
                }
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
                color: 0x9146FF,
                footer: {
                    text: `Total: ${channels.length}`
                }
            }
                
            await interaction.editReply({
                embeds: [ embed ],
                ephemeral: true
            });

            return;
        }  
    }
}