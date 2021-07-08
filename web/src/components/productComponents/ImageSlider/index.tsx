import React, { useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Container, ImgModal, FaTimesStyled } from './styles';

import { IImage } from '../../../pages/[productId]';

interface IProps {
	images: IImage[];
}

export default function ImageSlider({ images }: IProps) {

    const [modalActiveIndex, setModalActiveIndex] = useState<number | null>(null);

    function handleAdvanceModalActiveImage(){

        if(modalActiveIndex == images.length - 1) {

            setModalActiveIndex(0);

        } else {

            setModalActiveIndex(modalActiveIndex + 1);
        }
    }

    function handleRegressModalActiveImage(){

        if(modalActiveIndex == 0) {

            setModalActiveIndex(images.length - 1);

        } else {

            setModalActiveIndex(modalActiveIndex - 1);
        }
    }
	
	/*const customRenderThumb = (children) => children.map( (item, index) => (
		<div key={index} className="thumb-container">
			<img src={item.props.src} alt={item.props.alt} /> 
		</div>
    ));*/

        if(process.browser) console.log(window.innerWidth)  


    return (
        <Container>

            {(process.browser && (window.innerWidth > 720) && (modalActiveIndex !== null)) && (
                <ImgModal>
                    <figure>

                        <button
                            type='button'
                            onClick={() => setModalActiveIndex(null)}
                            className='close'
                        >
                            <FaTimesStyled />
                        </button>

                        <img src={`${process.env.BACKEND_URL}/uploads/${images[modalActiveIndex].filename}`} alt='imagem' />

                        <button
                            type='button'
                            className='left'
                            onClick={handleRegressModalActiveImage}
                        >
                            <AiOutlineLeft size='2rem' color='#111' />
                        </button>

                        <button
                            type='button'
                            className='right'
                            onClick={handleAdvanceModalActiveImage}
                        >
                            <AiOutlineRight size='2rem' color='#111' />
                        </button>

                    </figure>
                </ImgModal>
            )}

            <div className="img-container">

                <Carousel
                    className='carousel'
                    //renderThumbs={customRenderThumb}
                    autoPlay={true}
                    stopOnHover={true}
                    infiniteLoop={true}
                    interval={5000}
                    emulateTouch={true}
                >
                    {(images.length > 0)
                        //? images.map( (image, index) => <img src={image.url} key={index} />)
                        //: testImages.map((image, index) => <img src={image.url} key={index} />)
                        ? images.map( (image, index) => (
                            <button 
                                type='button'
                                key={image.id}
                                onClick={() => setModalActiveIndex(index)}
                            >
                                <img 
                                    src={`${process.env.BACKEND_URL}/uploads/${image.filename}`} 
                                    alt={image.filename} 
                                />
                           </button>
                        ))
                        : [1].map( (i) => <img src='/images/img-n-disp.png' key={i} />) 
                    }
                </Carousel>

            </div>
        </Container>
    );
}
