const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Replies with info about the target')
        .addUserOption(option => option.setName('target').setDescription('The user to get info on.').setRequired(true)),
	async execute(interaction, client) {
        const user = interaction.options.getUser('target');
		await interaction.reply(`${user.username}'s tag: ${user.tag}\n${user.username}'s id: ${user.id}\nDate Created: ${user.createdAt}`);
	},
};