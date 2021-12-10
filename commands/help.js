const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')

var sum = 0;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Add an amount of numbers together'),
	async execute(interaction, client) {
        const helpEmbed = new MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle('Help Menu')
	        .setAuthor(interaction.user.username, interaction.user.displayAvatarURL({format: 'png'}))
	        .addFields(
		        { name: '/help', value: `Displays the list of commands.` },
                { name: '/avatar <user>', value: `Displays the avatar of the user, returns yours if none is sent.`},
                { name : '/add <number, infinite, seperated by spaces.>', value: `Returns the sum of the given numbers`},
                { name: "/ping", value: `Sends the bot latency (speed/ping) in milliseconds`},
                { name: "/purge <number up to 99>", value: `Removes a given number of messages`},
                { name: "/say <message>", value: "Makes the bot say a message!"},
                { name: "/serverinfo", value: `Returns info about the server`},
                { name: "/snipe", value: `Sends the last deleted message in the channel`},
                { name: "/userinfo <user>", value: `Returns info about the given user`}

	        )
	        .setTimestamp()
		return interaction.reply({embeds : [helpEmbed]});
	},
};