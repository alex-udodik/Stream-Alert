const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("add")
        .setDescription("Subscribes a Twitch channel for live notifications"),

    async execute(interaction) {
        interaction.reply({
            content: "test123",
            ephemeral: true
        });
    }
}