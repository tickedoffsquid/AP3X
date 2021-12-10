const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('snipe')
		.setDescription('Get the last deleted message'),
	async execute(interaction, client) {
        const snipes = client.snipes.get(interaction.channel.id);
        if (!snipes) return interaction.reply("There are no deleted messages in the channel.");

        const target = snipes[0];

        const {msg, time, image} = target;
        const snipeEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
            .setImage(image)
            .setFooter(`${msg.content}`)
		return interaction.reply({embeds : [snipeEmbed]});
	},
};