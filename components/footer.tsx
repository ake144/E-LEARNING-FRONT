// components/Footer.tsx

import { FaFacebookF, FaInstagram, FaTwitter, FaTelegram, FaYoutube, FaLinkedin, FaTiktok } from 'react-icons/fa';
import { Separator } from "@/components/ui/separator";
import Link from 'next/link';
import React from 'react';
import { Button } from "./ui/button";
import  image from "@/public/learning.png";
import Image from 'next/image';

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-secondary  py-6 lg:h-[300px] h-[400px]">
      <div className="container mx-auto px-4 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-center pt-10 px-10">
          <div className="flex items-center mb-6 lg:mb-0">
            <div className="mr-4">
              <Image src={image} alt="Bright Path Logo"   width={100} height={100}  />
            </div>
            <div>
              <p className="text-xl font-bold">Bright Path</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center space-x-4 mb-6 lg:mb-0">
            <Button className="bg-white hover:bg-white text-black h-7 mb-2 lg:mb-0">
              <Link href='https://forms.gle/tTpeQLNHBfxoMmj17'>
                <p className="text-xs">BECOME INSTRUCTOR</p>
              </Link>
            </Button>
            <Link href="/contact" className="text-sm">Contact Us</Link>
            <Link href="/about"><p className="text-sm">About Us</p></Link>
            <Link href="https://docs.google.com/document/d/17dlgjLFcBNsTWX20Z3Bjp6U-hKG14CXCRMRb-VvK4cg/edit"><p className="text-sm">Press Kit</p></Link>
            <Link href="/faq"><p className="text-sm">FAQ</p></Link>
            <Link href="/terms"><p className="text-sm">Terms of Service</p></Link>
            <Link href="/privacy"><p className="text-sm">Privacy Policy</p></Link>
          </div>
        </div>
        
        <Separator className="my-4"  />

        <div className="flex flex-col lg:flex-row justify-between items-center mt-6 mb-10 px-10">
          <div className="mb-6 lg:mb-0">
            <p className="text-sm">© 2024 Bright Path Digital Services SC. All Rights Reserved</p>     
          </div>
          <div className="flex gap-5 justify-center py-4">
            <Link href="https://fb.com/Bright Path.et" target='_blank' className=" hover:text-gray-600">
              <FaFacebookF className="h-8 w-8" />
            </Link>
            <a href="https://instagram.com/Bright Path" target="_blank" className=" hover:text-gray-600">
              <FaInstagram className="h-8 w-8" />
            </a>
            <a href="https://twitter.com/Bright Path" target="_blank" className="hover:text-gray-600">
              <FaTwitter className="h-8 w-8" />
            </a>
            <a href="https://t.me/Bright Path" target="_blank" className="hover:text-gray-600">
              <FaTelegram className="h-8 w-8" />
            </a>
            <a href="https://www.youtube.com/@Bright Path?sub_confirmation=1" target="_blank" className="hover:text-gray-600">
              <FaYoutube className="h-8 w-8" />
            </a>
            <a href="https://linkedin.com/company/Bright Path" target="_blank" className="hover:text-gray-600">
              <FaLinkedin className="h-8 w-8" />
            </a>
            <a href="https://tiktok.com/@Bright Path" target="_blank" className="hover:text-gray-600">
              <FaTiktok className="h-8 w-8" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
