import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { client } from '../lib/sanity';
import { Clock, Users, Award, Star } from 'lucide-react';

// Hàm format giá tiền VND
const formatCurrency = (price: string | number) => {
  if (!price) return "Liên hệ";
  
  // Nếu đã là string và có chứa đ hoặc VND, giữ nguyên
  if (typeof price === 'string' && (price.includes('đ') || price.includes('VND') || price.includes('Liên hệ'))) {
    return price;
  }
  
  // Chuyển về số nếu là chuỗi số
  const numericPrice = typeof price === 'string' ? 
    parseFloat(price.replace(/[^\d]/g, '')) : price;
  
  // Format với dấu ngăn cách hàng nghìn
  return numericPrice.toLocaleString('vi-VN') + 'đ';
};

// Tính phần trăm giảm giá nếu chưa có
const calculateDiscount = (originalPrice: string | number, price: string | number): string => {
  if (!originalPrice || !price) return "";
  
  const original = typeof originalPrice === 'string' ? 
    parseFloat(originalPrice.replace(/[^\d]/g, '')) : originalPrice;
  
  const current = typeof price === 'string' ? 
    parseFloat(price.replace(/[^\d]/g, '')) : price;
  
  if (original <= current) return "";
  
  const discount = Math.round(((original - current) / original) * 100);
  return `${discount}%`;
};

// Sanity course type definition
type Course = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  slug: string;
  duration?: string;
  students?: number;
  level?: string;
  rating?: number;
};

export default function CoursesList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const query = `*[_type == "course"] {
          _id,
          title,
          description,
          "imageUrl": imageUrl.asset->url,
          price,
          originalPrice,
          discount,
          "slug": slug.current,
          duration,
          students,
          level,
          rating
        }`;
        
        const result = await client.fetch(query);
        
        // Chuyển đổi dữ liệu từ Sanity sang định dạng component cần
        const formattedCourses = result.map((item: any) => {
          // Tính discount nếu không có sẵn nhưng có originalPrice và price
          let discountValue = item.discount;
          if (!discountValue && item.originalPrice && item.price) {
            discountValue = calculateDiscount(item.originalPrice, item.price);
          }
          
          return {
            _id: item._id,
            title: item.title || "Chưa có tiêu đề",
            description: item.description || "Chưa có mô tả",
            imageUrl: item.imageUrl || "", 
            price: item.price || "Liên hệ",
            originalPrice: item.originalPrice,
            discount: discountValue,
            slug: item.slug || item._id,
            duration: item.duration || "8 tuần",
            students: item.students || Math.floor(Math.random() * 300) + 50, // Tạo số ngẫu nhiên nếu không có
            level: item.level || "Sơ cấp",
            rating: item.rating || (Math.random() * 1 + 4).toFixed(1) // Tạo đánh giá ngẫu nhiên từ 4.0-5.0
          };
        });
        
        setCourses(formattedCourses);
        setError("");
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu khóa học:", err);
        // Sử dụng dữ liệu mẫu khi có lỗi từ API trong môi trường dev
        if (process.env.NODE_ENV === 'development') {
          console.log("Sử dụng dữ liệu mẫu thay thế");
          const sampleCourses = [
            {
              _id: "282f4d31-db67-4100-9ef6-e6a8161bfa4e",
              title: "Khoá học IELTS",
              description: "Khoá học IELTS giúp bạn đạt band điểm mục tiêu từ 6.0-7.0+",
              imageUrl: "/images/courses/ielts.jpg",
              price: "1000000",
              originalPrice: "2000000",
              discount: "50%",
              slug: "khoa-hoc-ielts",
              duration: "12 tuần",
              students: 235,
              level: "Trung cấp",
              rating: 4.8
            },
            {
              _id: "sample2",
              title: "TOEIC Listening & Reading",
              description: "Luyện thi TOEIC L&R từ cơ bản đến nâng cao, đảm bảo đạt 750+",
              imageUrl: "/images/courses/toeic.jpg",
              price: "1800000",
              originalPrice: "2200000",
              discount: "18%",
              slug: "toeic-listening-reading",
              duration: "8 tuần",
              students: 412,
              level: "Sơ cấp - Trung cấp",
              rating: 4.7
            },
            {
              _id: "sample3",
              title: "Business English",
              description: "Tiếng Anh giao tiếp trong môi trường doanh nghiệp quốc tế",
              imageUrl: "/images/courses/business.jpg",
              price: "2200000",
              slug: "business-english",
              duration: "10 tuần",
              students: 187,
              level: "Trung cấp - Cao cấp",
              rating: 4.5
            },
            {
              _id: "sample4",
              title: "English for Kids",
              description: "Khóa học tiếng Anh dành riêng cho trẻ em từ 6-12 tuổi",
              imageUrl: "/images/courses/kids.jpg",
              price: "1500000",
              originalPrice: "1800000",
              discount: "17%",
              slug: "english-for-kids",
              duration: "16 tuần",
              students: 128,
              level: "Cơ bản",
              rating: 4.9
            }
          ];
          setCourses(sampleCourses);
        } else {
          setError("Không thể tải dữ liệu khóa học. Vui lòng thử lại sau.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Hiển thị trạng thái loading
  if (isLoading) {
    return (
      <section className="py-8 sm:py-10 md:py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center justify-center min-h-[180px]">
            <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-[#063674] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 text-sm sm:text-base">Đang tải khóa học...</p>
          </div>
        </div>
      </section>
    );
  }

  // Hiển thị lỗi nếu có
  if (error) {
    return (
      <section className="py-8 sm:py-10 md:py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-red-50 p-4 sm:p-6 rounded-lg max-w-2xl mx-auto">
            <p className="text-red-600 font-medium text-sm sm:text-base">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-3 sm:mt-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#063674] text-white text-sm rounded-md hover:bg-blue-800 transition-colors"
            >
              Thử lại
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#063674] mb-2">KHÓA HỌC NỔI BẬT</h2>
          <div className="w-16 sm:w-20 h-1 bg-red-600 mx-auto"></div>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-600 max-w-3xl mx-auto px-2">Các khóa học được thiết kế phù hợp với mọi đối tượng học viên, giúp bạn đạt được mục tiêu học tập và phát triển kỹ năng tiếng Anh toàn diện</p>
        </div>
        
        {courses.length === 0 ? (
          <div className="bg-gray-50 p-4 sm:p-6 md:p-8 rounded-lg text-center max-w-md sm:max-w-lg md:max-w-2xl mx-auto">
            <p className="text-gray-500 mb-2 sm:mb-4 text-sm sm:text-base">Chưa có khóa học nào.</p>
            <p className="text-gray-600 text-sm sm:text-base">Vui lòng quay lại sau.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {courses.map((course) => (
              <div key={course._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col h-full">
                <div className="relative h-44 sm:h-48 md:h-52">
                  {course.discount && (
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-red-600 text-white text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full z-10">
                      Giảm {course.discount}
                    </div>
                  )}
                  <div className="w-full h-full relative overflow-hidden">
                    {course.imageUrl ? (
                      <Image 
                        src={course.imageUrl} 
                        alt={course.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                        <span className="text-gray-500 text-sm">{course.title}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-3 sm:p-4 w-full">
                        <p className="text-white text-xs sm:text-sm font-medium line-clamp-2">{course.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-grow">
                  {course.rating && (
                    <div className="flex items-center mb-2 sm:mb-3 text-yellow-500">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
                      <span className="ml-1 text-xs sm:text-sm font-medium">{course.rating}</span>
                      <span className="mx-1 sm:mx-1.5 text-gray-300">•</span>
                      <span className="text-xs sm:text-sm text-gray-500">{course.students?.toLocaleString()} học viên</span>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
                    {course.level && (
                      <span className="text-[10px] sm:text-xs font-medium bg-blue-50 text-blue-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                        {course.level}
                      </span>
                    )}
                    {course.duration && (
                      <span className="text-[10px] sm:text-xs font-medium bg-green-50 text-green-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center">
                        <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                        {course.duration}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-base sm:text-lg font-bold text-[#063674] mb-2 sm:mb-3 line-clamp-2 min-h-[40px] sm:min-h-[48px]">{course.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2 min-h-[32px] sm:min-h-[40px]">{course.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-2 sm:pt-3 border-t border-gray-100">
                    <div className="flex flex-col">
                      <span className="text-red-600 font-bold text-sm sm:text-lg">{formatCurrency(course.price)}</span>
                      {course.originalPrice && (
                        <span className="text-gray-400 text-xs sm:text-sm line-through">{formatCurrency(course.originalPrice)}</span>
                      )}
                    </div>
                    <Link 
                      href={`/courses/${course.slug}`} 
                      className="bg-[#063674] text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-800 transition-colors flex items-center whitespace-nowrap"
                    >
                      <span>Chi tiết</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-8 sm:mt-10 md:mt-12">
          <Link 
            href="/courses" 
            className="inline-flex items-center bg-red-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-red-700 transition-all transform hover:scale-105"
          >
            <span>Xem tất cả khóa học</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1 sm:ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}