"use client";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { banner1, banner2 } from "@/assets/images";
import CoursesList from "./components/CoursesList";
import FreeResources from "./components/FreeResources";
import ContactTeacherForm from "./components/ContactTeacherForm";

export default function Home() {
  // Custom arrow components
  const CustomNextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none" }}
        onClick={onClick}
      />
    );
  };

  const CustomPrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none" }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  const banners = [
    {
      id: 1,
      imageUrl: banner1,
      alt: "Banner 1",
    },
    {
      id: 2,
      imageUrl: banner2,
      alt: "Banner 2",
    },
  ];

  return (
    <main className="mx-auto bg-white">
      <div className="w-full relative">
        <Slider {...settings}>
          {banners.map((banner) => (
            <div key={banner.id} className="relative h-[500px]">
              <Image
                src={banner.imageUrl}
                alt={banner.alt}
                fill
                className="object-cover"
                priority={banner.id === 1}
              />
            </div>
          ))}
        </Slider>
      </div>

      <CoursesList />
      <FreeResources />
      <ContactTeacherForm />
    </main>
  );
}
