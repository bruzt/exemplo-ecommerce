import Sonic from 'sonic-channel';

const ingest = new Sonic.Ingest({
	host: process.env.SONIC_HOST as string,
	port: Number(process.env.SONIC_PORT),
	auth: process.env.SONIC_AUTH,
}).connect({});

const search = new Sonic.Search({
	host: process.env.SONIC_HOST as string,
	port: Number(process.env.SONIC_PORT),
	auth: process.env.SONIC_AUTH,
}).connect({});

export default {
	ingest,
	search,
}
