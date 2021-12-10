const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Get the avatar URL of the selected user, or your own avatar.')
		.addUserOption(option => {
            return option
            .setName('user')
            .setDescription('The user to kick')
            .setRequired(true)
        })
        .addStringOption(reason => {
            return reason
            .setName('reason')
            .setDescription('The reason to kick this member')
        }),
	async execute(interaction, client) {
		const user = interaction.options.getMember('user');
        var reason = interaction.options.getString('reason');
        if (interaction.member.permissions.has([Permissions.FLAGS.KICK_MEMBERS])) {
		    if (user) {
                var username = user.username;
                if (!reason) {
                    reason = "N/A"
                }
                user.kick(reason);
            }
		    return interaction.reply(`Kicked ${username} with reason: ${reason}`);
        }
        else {
            return interaction.reply(`You do not have the permission to kick members.`);
        }
	},
};