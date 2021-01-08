const { Op } = require('sequelize');

const orderModel = require('../../models/OrderModel');
const pagarMeClient = require('./pagarMeClient');

let timeoutId;

module.exports = async function periodicCheck() {
    
    const orders = await orderModel.findAll({
        where: {
            status: {
                [Op.or]: ['processing', 'waiting_payment']
            }
        }
    });

    let client;
    if(orders.length > 0) client = await pagarMeClient();
    
    for(const order of orders){
        
        const reference_key = `${order.id}!${Number(order.createdAt)}`
        const response = await client.transactions.find({ reference_key });
       
        if(response.length > 0){

            order.status = response[0].status;
            await order.save();
        }
    }

    clearTimeout(timeoutId);

    timeoutId = setTimeout( () => {
        periodicCheck();
    }, 43200000); // roda a cada 12 horas
}
