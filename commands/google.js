const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const googleIt = require('google-it');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('google')
		.setDescription('Google a search term')
        .addStringOption(option => {
            return option
            .setName("searchquery")
            .setDescription("The query to search")
            .setRequired(true)
        }),
	async execute(interaction) {
        const googleEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setTimestamp()
        googleIt({'query': interaction.options.getString('searchquery')}).then(results => {
                results.forEach(function(item, index) { 
                    googleEmbed.addField((index + 1) + ": " + item.title, "<" + item.link + ">");
                });
                return interaction.reply({embeds : [googleEmbed]});
            })
    },
};