const client = require('../index.js')
const onJoin = require('../commands/welcome.js')

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(member) {
        onJoin(member);
    }
}