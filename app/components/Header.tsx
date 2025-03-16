"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronDown, Menu, X } from "lucide-react";
import logo from "@/assets/images/logo-btalk.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "TRANG CHỦ", href: "/" },
    { label: "GIỚI THIỆU", href: "/about" },
    { label: "KHÓA HỌC", href: "/courses" },
    { label: "TÀI LIỆU TIẾNG ANH", href: "/resources" },
    { label: "TIN TỨC", href: "/news" },
    { label: "LIÊN HỆ", href: "/contact" },
  ];

  return (
    <header className="w-full bg-white ">
      {/* Top header with logo, phone, social media, search and auth */}
      <div className="w-[90%] h-[120px] mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between ">
        {/* Logo and phone */}
        <div className="flex items-center space-x-8 mb-4 md:mb-0">
          <div className="flex items-center">
            <div className="relative h-16 w-16 mr-2">
              <Image
                src={logo}
                alt="BTALK Logo"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-[#063674] font-bold text-2xl leading-tight">
                BTALK ENGLISH
              </h1>
              <p className="text-[#063674] text-xs">Học là giỏi, thi là đỗ</p>
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <span className="text-[#063674] font-bold text-xl">
              098 366 22 16
            </span>
          </div>
        </div>

        {/* Social, search and auth */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Bạn muốn tìm gì?"
              className="w-full bg-gray-100 rounded-full py-2 px-4 pr-10 text-sm"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-600">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-[#063674] h-[40px] text-white sticky">
        <div className="w-[90%] mx-auto px-4">
          {/* Mobile menu button */}
          <div className="md:hidden flex justify-between items-center py-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              <span className="ml-2">MENU</span>
            </button>
            <div className="flex items-center md:hidden">
              <span className="text-white font-bold">098 366 22 16</span>
            </div>
          </div>

          {/* Desktop menu */}
          <div>
            <div className="flex justify-between px-4 md:flex-row md:items-center py-2 space-y-2 md:space-y-0 md:space-x-4 w-full">
              {menuItems.map((item, index) => (
                <div key={index}>
                  <Link href={item.href}>{item.label}</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
