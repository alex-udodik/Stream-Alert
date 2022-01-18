const { SlashCommandBuilder } = require('@discordjs/builders');

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

        //TODO: 
        /* 
            Connect to DynamoDB and check if channel name exists.
            IF NOT: Send message back saying user not found 
                (Check spelling! Or use /info command of added channel names)

            IF EXISTS: Send the subscription id to API which will trigger lambda function for unsubscribing.
                Recieve results and display message
        */

        interaction.reply({
            content: 'test123',
            ephemeral: true
        });
    }
}