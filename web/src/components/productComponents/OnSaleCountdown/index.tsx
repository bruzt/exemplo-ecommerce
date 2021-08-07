import React, { useState, useEffect } from 'react';
import { FaClock } from 'react-icons/fa';

import { IProduct } from '../../../pages/[productId]';

import { Container } from './styles';

interface IProps {
	product: IProduct;
	setIsOnSale: React.Dispatch<boolean>;
	timeoutId: NodeJS.Timeout;
}

export default function OnSaleCountdown({ product, setIsOnSale, timeoutId }: IProps) {

	const [getDays, setDays] = useState(0);
	const [getHours, setHours] = useState(0);
	const [getMinutes, setMinutes] = useState(0);
	const [getSeconds, setSeconds] = useState(0);

	useEffect(() => {
		calcCountdown();

		return () => clearTimeout(timeoutId);
	}, []);

	function calcCountdown() {

		if (product.isOnSale) {

			const startDate = new Date(product.discount_datetime_start);
			const endDate = new Date(product.discount_datetime_end);

			const milliseconds = Number(new Date(product.dateNow)) - Number(endDate);

			clearTimeout(timeoutId);

			loopCountdown(milliseconds, startDate, endDate);
		}
	}

	function loopCountdown(milliseconds: number, startDate: Date, endDate: Date) {

		const dateNow = new Date(-milliseconds + Number(startDate));

		if (startDate <= dateNow && endDate >= dateNow) {

			const totalSeconds = -milliseconds / 1000;
			setSeconds(Math.floor(totalSeconds % 60));

			const totalMinutes = totalSeconds / 60;
			setMinutes(Math.floor(totalMinutes % 60));

			const totalHours = totalMinutes / 60;
			setHours(Math.floor(totalHours % 24));

			const totalDays = totalHours / 24;
			setDays(Math.floor(totalDays));

			milliseconds += 1000;

		}
		else return setIsOnSale(false);

		timeoutId = setTimeout(() => {

			loopCountdown(milliseconds, startDate, endDate);

		}, 1000);
	}

	return (
		<Container>

			<div className="countdown">
				<FaClock size={25} />
				<span data-testid='clock'>{getDays} Dia{getDays > 1 ? 's' : ''} {getHours < 10 ? '0' + getHours : getHours}:{getMinutes < 10 ? '0' + getMinutes : getMinutes}:{getSeconds < 10 ? '0' + getSeconds : getSeconds}</span>
			</div>

			<hr />

		</Container>
	);
}
