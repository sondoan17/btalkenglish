"use client";
import { useState } from "react";

export default function ContactTeacherForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      // Here you would typically send the data to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        course: "",
        message: "",
      });
    } catch (error) {
      setSubmitError("Có lỗi xảy ra khi gửi form. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 bg-[#063674] text-white text-center">
            <h2 className="text-2xl font-bold">ĐĂNG KÝ TƯ VẤN</h2>
            <p className="mt-2">Để lại thông tin để được tư vấn miễn phí</p>
          </div>
          
          <div className="p-6">
            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Đăng ký thành công!</h3>
                <p className="text-gray-600">Cảm ơn bạn đã đăng ký tư vấn. Giáo viên của chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
                <button 
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-6 bg-[#063674] text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
                >
                  Đăng ký tư vấn khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Họ và tên <span className="text-red-600">*</span></label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập họ và tên của bạn"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">Số điện thoại <span className="text-red-600">*</span></label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập số điện thoại của bạn"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập địa chỉ email của bạn"
                  />
                </div>
                
                <div>
                  <label htmlFor="course" className="block text-gray-700 font-medium mb-1">Khóa học quan tâm</label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Chọn khóa học --</option>
                    <option value="ielts">IELTS Academic</option>
                    <option value="toeic">TOEIC Listening & Reading</option>
                    <option value="business">Business English</option>
                    <option value="kids">English for Kids</option>
                    <option value="other">Khóa học khác</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Nội dung</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập nội dung bạn muốn tư vấn"
                  ></textarea>
                </div>
                
                {submitError && (
                  <div className="p-3 bg-red-100 text-red-700 rounded-md">
                    {submitError}
                  </div>
                )}
                
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-red-600 text-white px-6 py-3 rounded-md font-medium hover:bg-red-700 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu tư vấn'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}