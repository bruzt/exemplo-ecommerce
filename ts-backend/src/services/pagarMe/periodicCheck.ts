import orderModel from '../../models/OrderModel';
import pagarMeClient from './client';

let timeoutId: NodeJS.Timeout;

export default async function periodicCheck() {

	const orders = await orderModel.find({
		where: [
			{ status: 'processing' },
			{ status: 'waiting_payment' },
		]
	});

	let client;
	if (orders.length > 0 && client == null) client = await pagarMeClient();

	for (const order of orders) {

		const reference_key = `${order.id}!${Number(order.created_at)}`
		const response = await client.transactions.find({ reference_key });

		if (response.length > 0) {

			order.status = response[0].status;
			await order.save();
		}
	}

	clearTimeout(timeoutId);

	timeoutId = setTimeout(() => {
		periodicCheck();
	}, 21600000); // executa a cada 6 horas
}