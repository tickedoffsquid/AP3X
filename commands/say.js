const { SlashCommandBuilder } = require('@discordjs/builders');
var x;
module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Replies with info about the author')
        .addStringOption(x => {
            return x
            .setName("message")
            .setRequired(true)
            .setDescription("What you want the bot to say!")
        }),
	async execute(interaction, client) {
        await interaction.reply(`${interaction.options.getString("message")}`)
        await interaction.deleteReply();
		await interaction.channel.send(`${interaction.options.getString("message")}`);
	},
};