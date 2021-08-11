import React from 'react';
import Loader from 'react-loader-spinner';

import { Container } from './styles';

interface IProps {
	spinnerSize: number | string;
}

export default function LoadingModal({ spinnerSize }: IProps) {

	return (
		<Container>
			<Loader
				type="TailSpin"
				color="#5c7e10"
				height={spinnerSize}
				width={spinnerSize}
			/>
		</Container>
	);
}
