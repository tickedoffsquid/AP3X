const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction, client) {
		const delay = Math.abs(Date.now() - interaction.createdTimestamp);
		await interaction.reply(`Pong! Bot latency is ${delay}ms!`);
	},
};