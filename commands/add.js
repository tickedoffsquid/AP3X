const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')

var sum = 0;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
		.setDescription('Add an amount of numbers together')
		.addStringOption(option => {
            return option
            .setName("numbers")
            .setDescription("The numbers you wish to add together")
            .setRequired(true)
        }),
	async execute(interaction, client) {
		var num = interaction.options.getString('numbers')
        var numList = num.split(' ')
        for (i = 0; i < numList.length; i++) {
            sum += parseInt(numList[i]);
        }
        const sumEmbed = new MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle('Addition')
	        .setAuthor(interaction.user.username, interaction.user.displayAvatarURL({format: 'png'}))
	        .setDescription(numList.join(', '))
	        .addFields(
		        { name: 'Sum', value: `${sum}` },
	        )
	        .setTimestamp()
		return interaction.reply({embeds : [sumEmbed]});
	},
};