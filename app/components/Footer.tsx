"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/images/logo-btalk.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Về BTALK",
      links: [
        { label: "Giới thiệu", href: "/about" },
        { label: "Đội ngũ giáo viên", href: "/teachers" },
        { label: "Cơ sở vật chất", href: "/facilities" },
        { label: "Tuyển dụng", href: "/careers" },
      ],
    },
    {
      title: "Khóa học",
      links: [
        { label: "IELTS", href: "/courses/ielts" },
        { label: "TOEIC", href: "/courses/toeic" },
        { label: "Tiếng Anh giao tiếp", href: "/courses/communication" },
        { label: "Tiếng Anh trẻ em", href: "/courses/kids" },
      ],
    },
    {
      title: "Tài nguyên",
      links: [
        { label: "Tài liệu miễn phí", href: "/resources" },
        { label: "Blog tiếng Anh", href: "/blog" },
        { label: "Tin tức & Sự kiện", href: "/news" },
        { label: "Câu chuyện học viên", href: "/success-stories" },
      ],
    },
  ];

  return (
    <footer className="bg-[#063674] text-white">
      <div className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="relative h-10 w-10 mr-2">
                <Image
                  src={logo}
                  alt="BTALK Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold">BTALK ENGLISH</h3>
            </div>
           
            <ul className="space-y-2 mt-4">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-sm">ĐỊA CHỈ</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span className="text-sm">SĐT</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span className="text-sm">EMAIL</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <Link href="https://facebook.com" className="hover:text-red-500 transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="https://instagram.com" className="hover:text-red-500 transition-colors">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="https://youtube.com" className="hover:text-red-500 transition-colors">
                <Youtube className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      href={link.href} 
                      className="text-sm hover:text-red-500 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm">
            &copy; {currentYear} BTALK English. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
