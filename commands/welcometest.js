const { SlashCommandBuilder } = require('@discordjs/builders');
const { onJoin } = require("./welcome.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('welcometest')
		.setDescription('Simulates someone joining the server.'),
	async execute(interaction, client) {
        interaction.reply("Simulating a user join.");
		await onJoin(interaction.member);
	},
};