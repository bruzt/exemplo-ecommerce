import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';

import OnSaleCountdown from './';
import { fakeProducts } from '../../../testUtils/fakeData';

function sleep(timeout: number){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, timeout);
    });
}

describe('On Sale Countdown Tests', () => {

    it('should change clock text', async () => {

        function setIsOnSale(isOnSale: boolean){ return isOnSale }
        let timeoutId: NodeJS.Timeout;

        const discountStart = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString();
        const discountEnd = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();

        await act( async () => {
            const { getByTestId } = render(
                <OnSaleCountdown 
                    product={{ 
                        ...fakeProducts[0], 
                        isOnSale: true,
                        discount_datetime_start: discountStart,
                        discount_datetime_end: discountEnd,
                        dateNow: new Date().toISOString(),
                    }}
                    setIsOnSale={setIsOnSale}
                    timeoutId={timeoutId}
                />
            );
    
            const clockSpanBefore = getByTestId('clock').innerHTML;
    
            await sleep(1000); // 1 sec
    
            const clockSpanAfter = getByTestId('clock').innerHTML;
    
            expect(clockSpanBefore).not.toBe(clockSpanAfter);
        });
    });

    it('should set is on sale to false', async () => {

        await act( async () => {

            let isOnSale = true;
            function setIsOnSale(value: boolean){ isOnSale = value }
            let timeoutId: NodeJS.Timeout;

            const now = new Date().toISOString();
            const discountStart = new Date(new Date().setSeconds(new Date().getSeconds() - 1)).toISOString();
            const discountEnd = new Date(new Date().setSeconds(new Date().getSeconds() + 1)).toISOString();
            
            render(
                <OnSaleCountdown 
                    product={{ 
                        ...fakeProducts[0], 
                        isOnSale,
                        discount_datetime_start: discountStart,
                        discount_datetime_end: discountEnd,
                        dateNow: now,
                    }}
                    setIsOnSale={setIsOnSale}
                    timeoutId={timeoutId}
                />
            );
    
            await sleep(3000); // 3 sec
    
            expect(isOnSale).toBe(false);
        });
    });
});