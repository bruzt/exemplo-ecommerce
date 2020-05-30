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

    const customRenderThumb = (children) => children.map( (item, index) => {
        
        return (
            <>
                <img src={item.props.src} key={index} /> 

                <style jsx>{`
                    img {
                        width: 70px;
                        height: 40px;
                    }
                `}</style>
            </>
        );
    });
        
    return (
        <>
            <div className="img-container">

                <Carousel
                    renderThumbs={customRenderThumb}
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