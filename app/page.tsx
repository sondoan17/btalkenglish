'use client'
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { banner1 } from "@/assets/images";

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const banners = [
    {
      id: 1,
      imageUrl: banner1,
      alt: "Banner 1"
    },
    {
      id: 2,
      imageUrl: banner1,
      alt: "Banner 2"
    }
  ];

  return (
    <main className="container mx-auto">
      <div className="w-full relative">
        <Slider {...settings}>
          {banners.map((banner) => (
            <div key={banner.id} className="relative h-[500px]">
              <Image
                src={banner.imageUrl}
                alt={banner.alt}
                fill
                className="object-contain"
                priority={banner.id === 1}
              />
            </div>
          ))}
        </Slider>
      </div>
    </main>
  );
}
