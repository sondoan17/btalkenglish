"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ChevronDown, Menu, X } from "lucide-react"
import logo from "@/assets/images/logo-btalk.png"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="w-full">
      {/* Top header with logo, phone, social media, search and auth */}
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between bg-[#063674]">
        {/* Logo and phone */}
        <div className="flex items-center space-x-8 mb-4 md:mb-0">
          <div className="flex items-center">
            <div className="relative h-16 w-16 mr-2">
              <Image
                src={logo}
                alt="Athena Logo"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-white font-bold text-2xl leading-tight">
                BTALK ENGLISH
              </h1>
              <p className="text-white text-xs">Học là giỏi, thi là đỗ</p>
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <span className="text-white font-bold text-xl">098 366 22 16</span>
          </div>
        </div>

        {/* Social, search and auth */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          {/* Social icons */}
          <div className="flex space-x-2">
            <Link
              href="#"
              className="bg-[#3b5998] text-white rounded-full p-2 flex items-center justify-center h-10 w-10"
            >
              <span className="sr-only">Facebook</span>f
            </Link>
            <Link
              href="#"
              className=" text-white rounded-full p-2 flex items-center justify-center h-10 w-10"
            >
              <span className="sr-only">YouTube</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M12 19c-2.3 0-6.4-.2-8.1-.6-.7-.2-1.2-.7-1.4-1.4-.3-1.1-.5-3.4-.5-5s.2-3.9.5-5c.2-.7.7-1.2 1.4-1.4C5.6 5.2 9.7 5 12 5s6.4.2 8.1.6c.7.2 1.2.7 1.4 1.4.3 1.1.5 3.4.5 5s-.2 3.9-.5 5c-.2.7-.7 1.2-1.4 1.4-1.7.4-5.8.6-8.1.6 0 0 0 0 0 0z"></path>
                <polygon points="10 15 15 12 10 9"></polygon>
              </svg>
            </Link>
            <Link href="#" className="bg-black text-white rounded-full p-2 flex items-center justify-center h-10 w-10">
              <span className="sr-only">TikTok</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
                <path d="M15 8v8a4 4 0 0 1-4 4"></path>
                <line x1="15" x2="15" y1="4" y2="12"></line>
              </svg>
            </Link>
          </div>

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
      <nav className="bg-[#063674] text-white">
        <div className="container mx-auto px-4">
          {/* Mobile menu button */}
          <div className="md:hidden flex justify-between items-center py-3">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="ml-2">MENU</span>
            </button>
            <div className="flex items-center md:hidden">
              <span className="text-white font-bold">098 366 22 16</span>
            </div>
          </div>

          {/* Desktop menu */}
          <ul
            className={`${isMenuOpen ? "block" : "hidden"} md:flex flex-col md:flex-row md:items-center py-2 space-y-2 md:space-y-0`}
          >
            <li className="md:px-4 py-2 font-medium">
              <Link href="/">TRANG CHỦ</Link>
            </li>
            <li className="md:px-4 py-2 font-medium group relative">
              <Link href="#" className="flex items-center">
                GIỚI THIỆU <ChevronDown className="h-4 w-4 ml-1" />
              </Link>
              {/* Dropdown can be added here */}
            </li>
            <li className="md:px-4 py-2 font-medium group relative">
              <Link href="#" className="flex items-center">
                KHÓA HỌC <ChevronDown className="h-4 w-4 ml-1" />
              </Link>
              {/* Dropdown can be added here */}
            </li>
            <li className="md:px-4 py-2 font-medium">
              <Link href="#">LỊCH KHAI GIẢNG</Link>
            </li>
            <li className="md:px-4 py-2 font-medium">
              <Link href="#">TÀI LIỆU TOEIC</Link>
            </li>
            <li className="md:px-4 py-2 font-medium">
              <Link href="#">TÀI LIỆU IELTS</Link>
            </li>
            <li className="md:px-4 py-2 font-medium">
              <Link href="#">TÀI LIỆU TIẾNG ANH</Link>
            </li>
            <li className="md:px-4 py-2 font-medium group relative">
              <Link href="#" className="flex items-center">
                ONLINE TEST <ChevronDown className="h-4 w-4 ml-1" />
              </Link>
              {/* Dropdown can be added here */}
            </li>
            <li className="md:px-4 py-2 font-medium">
              <Link href="#">LIÊN HỆ</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
