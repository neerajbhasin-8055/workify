import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "./ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Data Analyst",
    "Full Stack Developer",
    "Data Science Engineer",
];

// Custom Previous Arrow Component
const PrevArrow = ({ onClick }) => (
    <button 
        className="absolute left-[-30px] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg z-10"
        onClick={onClick}
    >
        <FaChevronLeft size={10} />
    </button>
);

// Custom Next Arrow Component
const NextArrow = ({ onClick }) => (
    <button 
        className="absolute right-[-30px] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg z-10"
        onClick={onClick}
    >
        <FaChevronRight size={10} />
    </button>
);

const CategoryCarousel = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,  
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000, 
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 1024, 
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768, 
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <div className="w-[80%] mx-auto mt-10 relative">
            <h2 className="text-2xl font-bold text-center mb-5">Explore Categories</h2>

            <Slider {...settings}>
                {categories.map((category, index) => (
                    <div key={index} className="px-2">
                        <Button className="w-full bg-gray-900 text-white p-3 hover:bg-gray-700 rounded-md text-center">
                            {category}
                        </Button>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CategoryCarousel;
