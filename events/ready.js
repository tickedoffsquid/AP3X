module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
        const date = new Date();
  
        const formatData = (input) => {
        if (input > 9) {
            return input;
        } else return `0${input}`;
        };
  
        const formatHour = (input) => {
        if (input > 12) {
            return input - 12;
        }
        return input;
        };
  
        const format = {
            dd: formatData(date.getDate()),
            mm: formatData(date.getMonth() + 1),
            yyyy: date.getFullYear(),
            HH: formatData(date.getHours()),
            hh: formatData(formatHour(date.getHours())),
            MM: formatData(date.getMinutes()),
            SS: formatData(date.getSeconds()),
            };
        const format24Hour = ({ dd, mm, yyyy, HH, MM, SS }) => {
            message = `${mm}/${dd}/${yyyy} ${HH}:${MM}:${SS}`;
        };
        var message = "";
        format24Hour(format);
		console.log(`Bot went up at ${message}, Logged in as ${client.user.tag}`);
        const channelSendId = client.channels.cache.get("917568748729286657");
        channelSendId.send(`Bot went up at ${message}, Logged in as ${client.user.tag}`);
	},
};