import Image from "next/image";
import Link from "next/link";

type Resource = {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  viewCount: number;
};

export default function FreeResources() {
  // Sample resources data - replace with actual data
  const resources: Resource[] = [
    {
      id: 1,
      title: "IELTS Writing Task 2 Sample Essays",
      category: "IELTS",
      imageUrl: "/images/resources/ielts-writing.jpg",
      viewCount: 1250
    },
    {
      id: 2,
      title: "TOEIC Listening Practice Tests",
      category: "TOEIC",
      imageUrl: "/images/resources/toeic-listening.jpg",
      viewCount: 980
    },
    {
      id: 3,
      title: "English Grammar Cheat Sheet",
      category: "Grammar",
      imageUrl: "/images/resources/grammar.jpg",
      viewCount: 2150
    },
    {
      id: 4,
      title: "Business English Vocabulary List",
      category: "Business English",
      imageUrl: "/images/resources/business-vocab.jpg",
      viewCount: 750
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#063674] mb-2">TÀI LIỆU MIỄN PHÍ</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Truy cập ngay các tài liệu học tiếng Anh chất lượng hoàn toàn miễn phí</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-40">
                <div className="w-full h-full relative">
                  {/* Replace with actual images when available */}
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                    <span className="text-gray-500">{resource.category}</span>
                  </div>
                </div>
                <div className="absolute top-2 left-2 bg-[#063674] text-white text-xs px-2 py-1 rounded-md">
                  {resource.category}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-bold text-[#063674] mb-3 line-clamp-2">{resource.title}</h3>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span>{resource.viewCount.toLocaleString()} lượt xem</span>
                  </div>
                  <Link 
                    href={`/resources/${resource.id}`} 
                    className="flex items-center bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Xem tài liệu
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link href="/resources" className="inline-block bg-[#063674] text-white px-6 py-2 rounded-md font-medium hover:bg-blue-800 transition-colors">
            Xem tất cả tài liệu
          </Link>
        </div>
      </div>
    </section>
  );
}