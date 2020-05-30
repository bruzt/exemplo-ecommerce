import React from "react";
import { Carousel } from 'react-responsive-carousel'

//https://picsum.photos/800/400
const testImages = [
    { url: 'https://i.picsum.photos/id/424/700/400.jpg' },
    { url: 'https://i.picsum.photos/id/892/800/400.jpg' },
    { url: 'https://i.picsum.photos/id/622/900/400.jpg' },
    { url: 'https://i.picsum.photos/id/322/500/400.jpg' },
    { url: 'https://i.picsum.photos/id/267/300/400.jpg' },
];

export default function ImageSlider({ images }) {

    const customRenderThumb = (children) => children.map( (item, index) => (
        <React.Fragment key={index}>

            <div className="thumb-container">
                <img src={item.props.src} /> 
            </div>

            <style jsx>{`
                .thumb-container {
                    width: 70px;
                    height: 40px;

                    background: #0D2235;
                }

                .thumb-container img {
                   
                    width: auto;
                    max-width: 70px;
                    height: auto;
                    max-height: 40px;

                    display: block;
                    margin: 0 auto;
                }
            `}</style>
        </React.Fragment>
    ));
        
    return (
        <>
            <div className="img-container">

                <Carousel
                    renderThumbs={customRenderThumb}
                    autoPlay={true}
                    stopOnHover={true}
                    infiniteLoop={true}
                    interval={5000}
                    emulateTouch={true}
                >
                    {(images.length > 0)
                        ? images.map((image, index) => <img src={image.url} key={index} />)
                        : testImages.map((image, index) => <img src={image.url} key={index} />)}
                </Carousel>

            </div>

            <style jsx>{`
                .img-container {
                    width: 100%;
                    max-width: 700px;
                    height: 100%;
                    max-height: 400px;
                }

                .img-container img {
                    width: auto;
                    max-width: 700px;
                    height: auto;
                    max-height: 330px;
                }
            `}</style>
        </>
    );
}