import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000, // Auto change every 3s
        arrows: true,
    };

    return (
        <div className="w-[80%] mx-auto mt-10">
            <Slider {...settings}>
                <div>
                    <img src="https://via.placeholder.com/800x400" alt="Slide 1" className="rounded-lg" />
                </div>
                <div>
                    <img src="https://via.placeholder.com/800x400" alt="Slide 2" className="rounded-lg" />
                </div>
                <div>
                    <img src="https://via.placeholder.com/800x400" alt="Slide 3" className="rounded-lg" />
                </div>
            </Slider>
        </div>
    );
};

export default Carousel;
