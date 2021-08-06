import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import ImageSlider from './';
import { fakeImage } from '../../../testUtils/fakeData';

describe('Image Slider Tests', () => {

    it('should load image', async () => {

        const { queryAllByTestId } = render(<ImageSlider images={[fakeImage]} />);

        const sliderImg = queryAllByTestId('slider-img');

        expect(sliderImg[0]).toBeInTheDocument();
    });

    it('should load no-image', async () => {

        const { queryAllByTestId } = render(<ImageSlider images={[]} />);

        const noSliderImg = queryAllByTestId('no-slider-img');

        expect(noSliderImg[0]).toBeInTheDocument();
    });

    it('should open img modal on click', async () => {

        const { getAllByTestId, queryByTestId } = render(<ImageSlider images={[fakeImage]} />);

        const sliderImg = getAllByTestId('slider-img');
        
        fireEvent.click(sliderImg[0]);

        const modalImg = queryByTestId('img-modal-container');
    
        expect(modalImg).toBeInTheDocument();
    });

    it('should close img modal on click', async () => {

        const { getAllByTestId, queryByTestId, getByTestId } = render(<ImageSlider images={[fakeImage]} />);

        const sliderImg = getAllByTestId('slider-img');
        
        fireEvent.click(sliderImg[0]);

        const closeModalButton = getByTestId('close-img-modal-button');

        fireEvent.click(closeModalButton);

        const modalImg = queryByTestId('img-modal-container');
    
        expect(modalImg).not.toBeInTheDocument();
    });

    it('should go to next img on right click', async () => {

        const { getAllByTestId, getByTestId } = render(<ImageSlider images={[fakeImage,fakeImage,fakeImage]} />);

        const sliderImg = getAllByTestId('slider-img');
        
        fireEvent.click(sliderImg[0]);

        const rightModalButton = getByTestId('right-modal-button');

        fireEvent.click(rightModalButton);
    });

    it('should go to previous img on left click', async () => {

        const { getAllByTestId, getByTestId } = render(<ImageSlider images={[fakeImage,fakeImage,fakeImage]} />);

        const sliderImg = getAllByTestId('slider-img');
        
        fireEvent.click(sliderImg[0]);

        const leftModalButton = getByTestId('left-modal-button');

        fireEvent.click(leftModalButton);
    });
});