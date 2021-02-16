const Sonic = require('sonic-channel');

const ingest = new Sonic.Ingest({
	host: process.env.SONIC_HOST,
	port: process.env.SONIC_PORT,
	auth: process.env.SONIC_AUTH,
});

const search = new Sonic.Search({
	host: process.env.SONIC_HOST,
	port: process.env.SONIC_PORT,
	auth: process.env.SONIC_AUTH,
});

module.exports = {
	ingest,
	search
}
