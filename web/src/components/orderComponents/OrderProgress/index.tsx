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
				data-testid='cart-circle'
			>
				<FaShoppingCart color='#eee' size={25} />
			</div>

			<div className="bar">
				<div 
					className={`progress ${orderContext.getOrderFlowNumber >= 2 ? 'active' : ''}`} 
					data-testid='address-bar' 
				/>
			</div>

			<div 
				className={`circle ${orderContext.getOrderFlowNumber >= 2 ? 'active' : ''}`}
				title='Endereço'
				data-testid='address-circle'
			>
				<FaMapMarkerAlt color='#eee' size={25} />
			</div>

			<div className="bar">
				<div 
					className={`progress ${orderContext.getOrderFlowNumber >= 3 ? 'active' : ''}`} 
					data-testid='payment-bar'
				/>
			</div>

			<div 
				className={`circle ${orderContext.getOrderFlowNumber >= 3 ? 'active' : ''}`}
				title='Pagamento'
				data-testid='payment-circle'
			>
				<FaMoneyCheckAlt color='#eee' size={25} />
			</div>

			<div className="bar">
				<div 
					className={`progress ${orderContext.getOrderFlowNumber >= 4 ? 'active' : ''}`} 
					data-testid='confirmation-bar'
				/>
			</div>

			<div 
				className={`circle ${orderContext.getOrderFlowNumber >= 4 ? 'active' : ''}`}
				title='Confirmação'
				data-testid='confirmation-circle'
			>
				<FaCheck color='#eee' size={25} />
			</div>
		
		</Container>
	);
}
