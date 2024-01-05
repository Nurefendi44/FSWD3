import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Slide.css'

const Slider = () => {

    const [sliders, setSliders] = useState([]);

    useEffect(() => {

        fetch("https://admin.galoostore.com/api/homesliders")
            .then((response) => response.json())


            .then((data) => {

                setSliders(data.data);
            })

            .catch((error) => console.error("Error fetching sliders: ", error));
    }, []);

    return (
        <Carousel
            showStatus={false}
            showArrows={false}
            autoPlay={true}
            interval={3000}
            infiniteLoop={true}
            showThumbs={false}
            showIndicators={true}
            transitionTime={2000}
        >
            {sliders && sliders.map((slider, i) => (
                <div key={i} className='md:w-3/4 pt-14 md:pt-28 justify-center mx-auto'>
                    <img
                        className="d-block md:w-full"
                        src={slider.slider_image}
                    />
                </div>
            ))}
        </Carousel>

    );
};

export default Slider;
