"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Search, ChevronDown, Menu, X, Phone } from "lucide-react";
import logo from "@/assets/images/logo-btalk.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  
  const router = useRouter();
  const pathname = usePathname();

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set on initial load
    checkScreenSize();
    
    // Add event listener
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Toggle submenu on mobile
  const toggleSubmenu = (index: number) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  // Handle contact link click to scroll to contact section
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // If we're not on the homepage, navigate to homepage first
    if (pathname !== '/') {
      router.push('/#contact-section');
      return;
    }
    
    // If we're already on the homepage, scroll to the section
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const menuItems = [
    { 
      label: "TRANG CHỦ", 
      href: "/",
      hasSubmenu: false
    },
    { 
      label: "GIỚI THIỆU", 
      href: "/about",
      hasSubmenu: true,
      submenu: [
        { label: "Về BTalk English", href: "/about" },
        { label: "Phương pháp đào tạo", href: "/about/methodology" },
        { label: "Chính sách và cam kết", href: "/about/policies" },
        { label: "Tin tuyển dụng", href: "/about/careers" },
      ]
    },
    { 
      label: "KHÓA HỌC", 
      href: "/courses",
      hasSubmenu: true,
      submenu: [
        { label: "Khóa học IELTS", href: "/courses/ielts" },
        { label: "Khóa học TOEIC", href: "/courses/toeic" },
        { label: "Khóa học Online", href: "/courses/online" },
      ]
    },
    { 
      label: "TÀI LIỆU TIẾNG ANH", 
      href: "/resources",
      hasSubmenu: true,
      submenu: [
        { label: "Tài liệu IELTS", href: "/resources/ielts" },
        { label: "Tài liệu TOEIC", href: "/resources/toeic" },
        { label: "Tài liệu HSG", href: "/resources/hsg" },
      ]
    },
    { 
      label: "TIN TỨC", 
      href: "/news",
      hasSubmenu: false
    },
    { 
      label: "LIÊN HỆ", 
      href: "/#contact-section",
      hasSubmenu: false,
      isContactLink: true
    },
  ];

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your search logic here
    console.log('Search submitted');
    // Optionally close the search bar
    if (isMobile) {
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      {/* Top header with logo, phone, search */}
      <header className="w-full bg-white">
        <div className="w-full px-4 md:w-[90%] mx-auto py-3 md:py-4 flex flex-col md:flex-row items-center justify-between">
          {/* Logo and search toggle */}
          <div className="flex items-center justify-between w-full md:w-auto md:space-x-8 mb-3 md:mb-0">
            <div className="flex items-center">
              <div className="relative h-12 w-12 md:h-16 md:w-16 mr-2">
                <Image
                  src={logo}
                  alt="BTALK Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-[#063674] font-bold text-xl md:text-2xl leading-tight">
                  BTALK ENGLISH
                </h1>
                <p className="text-[#063674] text-xs">Học là giỏi, thi là đỗ</p>
              </div>
            </div>

            {/* Mobile Search Toggle Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="flex items-center text-[#063674] hover:text-red-600 transition-colors p-1"
                aria-label="Toggle search"
              >
                {isSearchOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Desktop Phone */}
            <div className="hidden md:flex items-center">
              <a href="tel:0983662216" className="text-[#063674] font-bold text-xl hover:text-red-600 transition-colors">
                098 366 22 16
              </a>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block w-full md:w-auto">
            <form onSubmit={handleSearchSubmit} className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Bạn muốn tìm gì?"
                className="w-full bg-gray-100 rounded-full py-2 px-4 pr-10 text-sm"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-600 hover:text-red-700 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Mobile Search Bar - Animated slide down */}
        {isSearchOpen && (
          <div className="md:hidden w-full bg-white py-3 px-4 border-t border-gray-100 animate-slideDown">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Bạn muốn tìm gì?"
                className="w-full bg-gray-100 rounded-full py-2 px-4 pr-10 text-sm"
                autoFocus
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-600 hover:text-red-700 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Navigation - Sticky */}
      <nav className="bg-[#063674] text-white sticky top-0 z-50 shadow-md">
        <div className="w-full md:w-[90%] mx-auto px-4">
          {/* Mobile menu button */}
          <div className="md:hidden flex justify-between items-center py-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-red-400 transition-colors flex items-center"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 mr-1" />
              ) : (
                <Menu className="h-5 w-5 mr-1" />
              )}
              <span className="text-sm">MENU</span>
            </button>
            <div className="flex items-center md:hidden">
              <a href="tel:0983662216" className="text-white text-sm font-bold hover:text-red-400 transition-colors">
                098 366 22 16
              </a>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="flex justify-between items-center py-2">
              {menuItems.map((item, index) => (
                <div 
                  key={index} 
                  className={`group relative text-center ${item.hasSubmenu ? 'has-dropdown' : ''}`}
                >
                  {item.isContactLink ? (
                    <a 
                      href={item.href}
                      onClick={handleContactClick}
                      className="font-medium text-sm lg:text-base transition-all duration-300 hover:text-red-400 whitespace-nowrap flex items-center justify-center px-2 cursor-pointer"
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  ) : (
                    <Link 
                      href={item.href}
                      className="font-medium text-sm lg:text-base transition-all duration-300 hover:text-red-400 whitespace-nowrap flex items-center justify-center px-2"
                    >
                      {item.label}
                      {item.hasSubmenu && (
                        <ChevronDown className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:rotate-180" />
                      )}
                      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  )}
                  
                  {/* Dropdown Menu */}
                  {item.hasSubmenu && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-64 bg-white text-[#063674] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 z-50 overflow-hidden">
                      {/* Triangle indicator */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45"></div>
                      <ul className="py-2 relative">
                        {item.submenu?.map((subItem, subIndex) => (
                          <li key={subIndex} className="border-b border-gray-100 last:border-b-0">
                            <Link 
                              href={subItem.href}
                              className="block px-4 py-3 hover:bg-gray-50 hover:text-red-600 transition-colors text-left text-sm"
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-[#063674] z-40 shadow-lg">
          <div className="w-full px-4 py-3">
            <ul className="space-y-0">
              {menuItems.map((item, index) => (
                <li key={index} className="border-b border-blue-800">
                  {item.hasSubmenu ? (
                    <div className="py-2">
                      <div 
                        className="flex justify-between items-center text-white py-1 hover:text-red-400 cursor-pointer"
                        onClick={() => toggleSubmenu(index)}
                      >
                        <Link 
                          href={item.href}
                          onClick={(e) => {
                            if (item.hasSubmenu) e.preventDefault();
                          }}
                        >
                          {item.label}
                        </Link>
                        <ChevronDown 
                          className={`h-4 w-4 transition-transform duration-300 ${activeSubmenu === index ? 'rotate-180' : ''}`} 
                        />
                      </div>
                      {activeSubmenu === index && (
                        <ul className="pl-4 mt-1 space-y-1 border-t border-blue-800 pt-1 animate-slideDown">
                          {item.submenu?.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link 
                                href={subItem.href} 
                                className="text-white block py-1 hover:text-red-400 hover:pl-2 transition-all duration-300 text-sm"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : item.isContactLink ? (
                    <a 
                      href={item.href}
                      className="text-white block py-3 hover:text-red-400 hover:pl-2 transition-all duration-300"
                      onClick={(e) => {
                        handleContactClick(e);
                      }}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link 
                      href={item.href} 
                      className="text-white block py-3 hover:text-red-400 hover:pl-2 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
