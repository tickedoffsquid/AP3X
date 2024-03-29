const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Purge up to 99 messages.')
		.addIntegerOption(option => option.setName('amount').setDescription('Number of messages to purge')),
	async execute(interaction, client) {
		const amount = interaction.options.getInteger('amount');

		if (amount <= 1 || amount > 100) {
			return interaction.reply({ content: 'You need to input a number between 1 and 99.', ephemeral: true });
		}
        if (interaction.member.permissions.has([Permissions.FLAGS.EDIT_MESSAGES])) {
            await interaction.channel.bulkDelete(amount, true).catch(error => {
                console.error(error);
                interaction.reply({ content: 'There was an error trying to purge messages in this channel!', ephemeral: true });
            });
    
            return interaction.reply({ content: `Successfully purged \`${amount}\` messages.`, ephemeral: true });
        }
        else {
            interaction.reply("You do not have the edit messages permission.")
        }
	},
};