import Image from "next/image";
import Link from "next/link";

// Sample course type definition
type Course = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  originalPrice?: string;
  discount?: string;
};

export default function CoursesList() {
  // Sample courses data - replace with actual data from API or CMS
  const courses: Course[] = [
    {
      id: 1,
      title: "IELTS Academic",
      description: "Khóa học IELTS Academic giúp bạn đạt band điểm mục tiêu",
      imageUrl: "/images/courses/ielts.jpg",
      price: "2.500.000đ",
      originalPrice: "3.000.000đ",
      discount: "17%"
    },
    {
      id: 2,
      title: "TOEIC Listening & Reading",
      description: "Luyện thi TOEIC L&R từ cơ bản đến nâng cao",
      imageUrl: "/images/courses/toeic.jpg",
      price: "1.800.000đ",
      originalPrice: "2.200.000đ",
      discount: "18%"
    },
    {
      id: 3,
      title: "Business English",
      description: "Tiếng Anh giao tiếp trong môi trường doanh nghiệp",
      imageUrl: "/images/courses/business.jpg",
      price: "2.200.000đ"
    },
    {
      id: 4,
      title: "English for Kids",
      description: "Khóa học tiếng Anh dành cho trẻ em từ 6-12 tuổi",
      imageUrl: "/images/courses/kids.jpg",
      price: "1.500.000đ",
      originalPrice: "1.800.000đ",
      discount: "17%"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#063674] mb-2">KHÓA HỌC NỔI BẬT</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Các khóa học được thiết kế phù hợp với mọi đối tượng học viên</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                {course.discount && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                    -{course.discount}
                  </div>
                )}
                <div className="w-full h-full relative">
                  {/* Replace with actual images when available */}
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                    <span className="text-gray-500">{course.title}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-bold text-[#063674] mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-red-600 font-bold">{course.price}</span>
                    {course.originalPrice && (
                      <span className="text-gray-400 text-sm line-through ml-2">{course.originalPrice}</span>
                    )}
                  </div>
                  <Link href={`/courses/${course.id}`} className="bg-[#063674] text-white px-3 py-1 rounded-md text-sm hover:bg-blue-800 transition-colors">
                    Chi tiết
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link href="/courses" className="inline-block bg-red-600 text-white px-6 py-2 rounded-md font-medium hover:bg-red-700 transition-colors">
            Xem tất cả khóa học
          </Link>
        </div>
      </div>
    </section>
  );
}