const Sonic = require('sonic-channel');

const ingest = new Sonic.Ingest({
	host: process.env.SONIC_HOST,
	port: Number(process.env.SONIC_PORT),
	auth: process.env.SONIC_AUTH,
}).connect();

const search = new Sonic.Search({
	host: process.env.SONIC_HOST,
	port: Number(process.env.SONIC_PORT),
	auth: process.env.SONIC_AUTH,
}).connect();

module.exports = {
	ingest,
	search
}
