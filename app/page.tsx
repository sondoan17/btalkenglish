"use client";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { banner1, banner2 } from "@/assets/images";
import CoursesList from "./components/CoursesList";
import FreeResources from "./components/FreeResources";
import ContactTeacherForm from "./components/ContactTeacherForm";
import { ArrowRight, BookOpen, GraduationCap, Users } from "lucide-react";
import Link from "next/link";

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
    dotsClass: "slick-dots custom-dots",
    appendDots: (dots: any) => (
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          width: "100%",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
  };

  const banners = [
    {
      id: 1,
      imageUrl: banner1,
      alt: "Banner 1",
      title: "Học Tiếng Anh Hiệu Quả",
      subtitle: "Phương pháp học cá nhân hóa | Giáo viên chuyên môn cao",
      ctaText: "Đăng ký tư vấn ngay",
      ctaLink: "#contact-section"
    },
    {
      id: 2,
      imageUrl: banner2,
      alt: "Banner 2",
      title: "Luyện Thi IELTS & TOEIC",
      subtitle: "Cam kết đầu ra | Lộ trình học tập rõ ràng",
      ctaText: "Khám phá khóa học",
      ctaLink: "/courses"
    },
  ];

  // Key features section
  const features = [
    {
      icon: <GraduationCap className="h-10 w-10 text-blue-600" />,
      title: "Đội ngũ giáo viên chất lượng cao",
      description: "Giáo viên có chứng chỉ quốc tế và kinh nghiệm nhiều năm trong giảng dạy"
    },
    {
      icon: <BookOpen className="h-10 w-10 text-red-600" />,
      title: "Giáo trình chuẩn quốc tế",
      description: "Tài liệu được biên soạn kỹ lưỡng, cập nhật với xu hướng đề thi mới nhất"
    },
    {
      icon: <Users className="h-10 w-10 text-green-600" />,
      title: "Lớp học quy mô nhỏ",
      description: "Tối đa 12 học viên mỗi lớp, đảm bảo sự quan tâm đến từng cá nhân"
    },
  ];

  return (
    <main className="mx-auto bg-white">
      {/* Hero Banner Section with Overlay Text */}
      <div className="w-full relative">
        <Slider {...settings}>
          {banners.map((banner) => (
            <div key={banner.id} className="relative h-[550px] md:h-[600px]">
              <Image
                src={banner.imageUrl}
                alt={banner.alt}
                fill
                className="object-cover brightness-[0.85]"
                priority={banner.id === 1}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex flex-col justify-center px-6 md:px-16 lg:px-24">
                <div className="max-w-2xl text-white">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fadeIn">{banner.title}</h1>
                  <p className="text-xl md:text-2xl mb-6 opacity-90">{banner.subtitle}</p>
                  <Link 
                    href={banner.ctaLink}
                    className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium transition-all transform hover:scale-105"
                  >
                    {banner.ctaText}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Key Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#063674] mb-2">TẠI SAO CHỌN BTALK ENGLISH?</h2>
              <div className="w-20 h-1 bg-red-600 mx-auto"></div>
              <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">Chúng tôi tự hào mang đến trải nghiệm học tập hiệu quả với phương pháp giảng dạy hiện đại và đội ngũ giáo viên chuyên nghiệp</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center group hover:border-blue-100"
                >
                  <div className="flex justify-center mb-6 transform transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#063674] mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section with decorative elements */}
      <div className="relative overflow-hidden">
        <div className="absolute right-0 top-10 w-64 h-64 bg-blue-100 rounded-full -mr-32 opacity-50 -z-10"></div>
        <div className="absolute left-0 bottom-10 w-40 h-40 bg-red-100 rounded-full -ml-20 opacity-50 -z-10"></div>
        <CoursesList />
      </div>

      {/* Resources Section with decorative elements */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-20 w-56 h-56 bg-yellow-100 rounded-full -ml-28 opacity-40 -z-10"></div>
        <div className="absolute right-0 bottom-20 w-48 h-48 bg-blue-100 rounded-full -mr-24 opacity-40 -z-10"></div>
        <FreeResources />
      </div>

      {/* Statistics Section */}
      <section className="py-16 bg-[#063674] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div className="text-blue-200">Học viên</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-200">Giáo viên</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">20+</div>
              <div className="text-blue-200">Khóa học</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-200">Học viên hài lòng</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#063674] mb-2">PHẢN HỒI TỪ HỌC VIÊN</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">Hãy xem học viên của chúng tôi nói gì về hành trình học tập của họ tại BTalk English</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="text-yellow-400 flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">"BTalk English đã giúp tôi đạt 7.5 IELTS chỉ sau 3 tháng học tập. Giáo viên tận tâm và phương pháp giảng dạy hiệu quả!"</p>
              <div className="font-bold text-[#063674]">Nguyễn Văn A</div>
              <div className="text-sm text-gray-500">Sinh viên Đại học</div>
              <div className="absolute -top-4 -left-4 bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">
                "
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="text-yellow-400 flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">"Tôi rất hài lòng với khóa học TOEIC tại BTalk. Điểm số của tôi đã tăng từ 600 lên 850 chỉ sau 2 tháng. Cảm ơn BTalk rất nhiều!"</p>
              <div className="font-bold text-[#063674]">Trần Thị B</div>
              <div className="text-sm text-gray-500">Nhân viên văn phòng</div>
              <div className="absolute -top-4 -left-4 bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">
                "
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="text-yellow-400 flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">"Con tôi rất yêu thích lớp học tại BTalk. Giáo viên nhiệt tình và lớp học vui vẻ đã giúp con tôi tiến bộ rất nhanh trong việc giao tiếp bằng tiếng Anh."</p>
              <div className="font-bold text-[#063674]">Lê Văn C</div>
              <div className="text-sm text-gray-500">Phụ huynh học sinh</div>
              <div className="absolute -top-4 -left-4 bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">
                "
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link href="/testimonials" className="inline-flex items-center text-[#063674] font-medium hover:text-red-600 transition-colors">
              Xem thêm phản hồi
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form Section with decorative elements */}
      <div id="contact-section" className="relative overflow-hidden">
        <div className="absolute right-0 top-0 w-40 h-40 bg-blue-100 rounded-full -mr-20 -mt-20 opacity-50 -z-10"></div>
        <div className="absolute left-0 bottom-0 w-40 h-40 bg-red-100 rounded-full -ml-20 -mb-20 opacity-50 -z-10"></div>
        <ContactTeacherForm />
      </div>
    </main>
  );
}
