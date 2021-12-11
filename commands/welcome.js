const { SlashCommandBuilder } = require('@discordjs/builders');
const mongo = require('../mongo');
const welcomeSchema = require('../schemas/welcome-schema');
const { Permissions } = require('discord.js')

const cache = {}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setwelcome')
		.setDescription('Set the server\'s welcome message!')
		.addStringOption(option => {
            return option
            .setName("message")
            .setDescription("The welcome message!")
            .setRequired(true)
        }),
	async execute(interaction, client) {
		const message = interaction.options.getString('message');
        if (!interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) {
            return interaction.reply("You do not have permission to run this command.");
        }
		else {
            cache[interaction.guild.id] = [interaction.channel.id, message];
            async function run() {
                await mongo().then(async (mongoose) => {
                    try {
                        await welcomeSchema.findOneAndUpdate({
                            _id: interaction.guild.id
                        }, {
                            _id: interaction.guild.id,
                            channelId: interaction.channel.id, 
                            text: message
                        }, {
                            upsert: true
                        })
                        interaction.reply(`Set the welcome message to ${message}`)
                    }
                    finally {
                        //mongoose.connection.close();
                    }
                })
            }
            run();
        }
	},
};

module.exports.onJoin = async function onJoin(member) { 
    const guild = member.guild;
    let data = cache[guild.id];

    if (!data) {
        console.log('FETCHING FROM DATABASE');
        await mongo().then(async (mongoose) => {
            try {
                const result = await welcomeSchema.findOne({ _id: guild.id});

                cache[guild.id] = data = [result.channelId, result.text];
            } finally {
                const channelId = data[0];
                const text = data[1];
                const channel = guild.channels.cache.get(channelId);
                return channel.send(text.replace(/<@>/g, `<@${member.id}>`));
                mongoose.connection.close();
            }
        })
    }
}
