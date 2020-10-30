import React from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import noImg from '../../../assets/img-n-disp.png';

import { Container } from './styles';

import { IImage } from '../../../pages/[productId]';

interface IProps {
	images: IImage[];
}

export default function ImageSlider({ images }: IProps) {
	
	const customRenderThumb = (children) => children.map( (item, index) => (
		<div key={index} className="thumb-container">
			<img src={item.props.src} /> 
		</div>
    ));
        
    return (
        <Container>
            <div className="img-container">

                <Carousel
                    className='carousel'
                    renderThumbs={customRenderThumb}
                    autoPlay={true}
                    stopOnHover={true}
                    infiniteLoop={true}
                    interval={5000}
                    emulateTouch={true}
                >
                    {(images.length > 0)
                        //? images.map( (image, index) => <img src={image.url} key={index} />)
                        //: testImages.map((image, index) => <img src={image.url} key={index} />)
                        ? images.map( (image, index) => <img src={`${process.env.BACKEND_URL}/uploads/${image.filename}`} key={index} />)
                        : [1].map( (i) => <img src={noImg} key={i} />) 
                    }
                </Carousel>

            </div>
        </Container>
    );
}
