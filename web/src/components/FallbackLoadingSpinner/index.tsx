import React from 'react';
import Loader from 'react-loader-spinner';

import { Container } from './styles';

import PageLayout from '../PageLayout';

export default function FallbackLoadingSpinner() {

    return (
        <PageLayout>
            <Container>
                <Loader
                    type="TailSpin"
                    color="#0D2235"
                    height={150}
                    width={150}
                />
            </Container>
        </PageLayout>
    );
}
