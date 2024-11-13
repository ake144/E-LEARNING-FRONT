import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaStar } from 'react-icons/fa';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Button } from './ui/button';


const testimonials = [
  {
    name: 'Jhon',
    image: 'https://via.placeholder.com/100',
    text: 'I like Bright Path as a whole and specifically our instructor Nabil for teaching English well. His way of teaching, pronunciation, and elaboration is so wonderful. The only thing to improve for the Bright Path is the payment method...',
    rating: 5,
  },
  {
    name:'Doe',
    image:'https://via.placeholder.com/100',
    text:'From starting Bright Path website is best for learning online courses in Ethiopia.',
    rating: 5,
}
];

const Testimonials = () => {
  const [current, setCurrent] = React.useState(0);
  const [iseOpen,setIsOpen] = useState(false)

  const nextTestimonial = () => {
    setCurrent((current + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold mt-4 mb-4">Testimonials</h2>
      <div className="flex items-center justify-center w-full max-w-3xl">
        <button onClick={prevTestimonial} className="text-blue-500 hover:text-blue-700">
          <FaArrowLeft size={24} />
        </button>
        <div className="bg-white p-6 mx-4 shadow-lg rounded-lg flex flex-col items-center text-center w-full">
          <img
            className="rounded-full w-20 h-20 mb-4"
            src={testimonials[current].image}
            alt={testimonials[current].name}
          />
          <h3 className="text-xl font-semibold">{testimonials[current].name}</h3>


          <p className="text-gray-600 mt-2">{testimonials[current].text}</p>

          <Dialog>
                <DialogTrigger asChild>
                    <a onClick={()=>{setIsOpen(true)}} className="text-blue-500 cursor-pointer mt-2">Read More</a>
                </DialogTrigger>
          <DialogContent className=" lg:w-[500px] w-[400px]   dialog-overlay bg-white">     
                     <div className="flex flex-col  items-center text-center w-full ">
                            <img
                                className="rounded-full w-20 h-20 mb-4"
                                src={testimonials[current].image}
                                alt={testimonials[current].name}
                            />
                            <h3 className="text-xl font-semibold">{testimonials[current].name}</h3>


                            <p className="text-gray-600 mt-2">{testimonials[current].text}</p>
                            <div className="flex mt-4">
                            {[...Array(testimonials[current].rating)].map((_, i) => (
                            <FaStar key={i} className="text-yellow-500" />
                            ))}
                        </div>

                     </div>
                       
                </DialogContent>

                </Dialog>

          <div className="flex mt-4">
            {[...Array(testimonials[current].rating)].map((_, i) => (
              <FaStar key={i} className="text-yellow-500" />
            ))}
          </div>
        </div>

        <button onClick={nextTestimonial} className="text-blue-500 hover:text-blue-700">
          <FaArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
