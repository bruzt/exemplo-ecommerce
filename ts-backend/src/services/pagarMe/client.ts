//@ts-ignore
import pagarme from 'pagarme';

export default function pagarMeClient(): Promise<any> {
    
    return pagarme.client.connect({ api_key: process.env.PAGARME_API_KEY });
}
