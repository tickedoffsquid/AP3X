const client = require('../index.js')

module.exports = {
    name: 'messageDelete',
    once: false,
    async execute(message) {
        console.log("E")
        let snipes = message.client.snipes.get(message.channel.id) || [];
        if (snipes.length > 5) snipes.slice(0, 4);

        snipes.unshift({
            msg: message,
            image: message.attachments.first()?.proxyURL || null,
            time: Date.now(),
        });

        message.client.snipes.set(message.channel.id, snipes);
    }
}