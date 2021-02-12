import React from 'react';
import { FaShoppingCart, FaMapMarkerAlt, FaMoneyCheckAlt, FaCheck } from 'react-icons/fa';

import { useOrder } from '../../../contexts/orderContext';

import { Container } from './styles';

export default function OrderProgress() {

	const orderContext = useOrder();

	return (
		<Container>
			
			<div 
				className={`circle ${orderContext.getOrderFlowNumber >= 1 ? 'active' : ''}`}
				title='Carrinho'
			>
				<FaShoppingCart color='#eee' size={25} />
			</div>

			<div className="bar">
				<div className={`progress ${orderContext.getOrderFlowNumber >= 2 ? 'active' : ''}`}></div>
			</div>

			<div 
				className={`circle ${orderContext.getOrderFlowNumber >= 2 ? 'active' : ''}`}
				title='Endereço'
			>
				<FaMapMarkerAlt color='#eee' size={25} />
			</div>

			<div className="bar">
				<div className={`progress ${orderContext.getOrderFlowNumber >= 3 ? 'active' : ''}`}></div>
			</div>

			<div 
				className={`circle ${orderContext.getOrderFlowNumber >= 3 ? 'active' : ''}`}
				title='Pagamento'
			>
				<FaMoneyCheckAlt color='#eee' size={25} />
			</div>

			<div className="bar">
				<div className={`progress ${orderContext.getOrderFlowNumber >= 4 ? 'active' : ''}`}></div>
			</div>

			<div 
				className={`circle ${orderContext.getOrderFlowNumber >= 4 ? 'active' : ''}`}
				title='Confirmação do pedido'
			>
				<FaCheck color='#eee' size={25} />
			</div>
		
		</Container>
	);
}
