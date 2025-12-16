import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';

import { Pagination } from "swiper/modules";
import { Autoplay,Navigation } from 'swiper/modules';

import "../../App.css";

function NewArrival() {



  const [newArrival, setNewArrival] = useState([]);

  useEffect(() => {
    const fetchNewArrival = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrival`
        );

        setNewArrival(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNewArrival();
  }, []);



  return (
    <>
      <section className="py-16 px-4 lg:py-0">
        <div className="container mx-auto text-center mb-auto relative">
          <h2 className="text-3xl font-bold mb-4">Explore New Arrival</h2>
          <p className="text-lg text-gray-600 mb-12">
            Discover the last styles straight off the runway, freshly added to
            keep your wardrobe on the cutting edge of fashion.
          </p>

        </div>

        {/*Scrollable content */}
        <div
          className="abcd scroll-y container mx-auto flex space-x-6 relative transition-transform duration-300"
        >
          <Swiper
          loop={true}
          autoplay={{
              delay: 1800,
              disableOnInteraction: false,
          }}
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,

          }}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          modules={[Autoplay,Pagination, Navigation]}
          className="mySwiper"
        >
            {newArrival.map((item,index) => (
                <SwiperSlide key={index}>
            <div
              className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"
            >
              <Link to={`/products/${item._id}`}>
                <img
                  src={item.images[0]?.url}
                  alt={item.images[0]?.altText || item.name}
                  className="w-full h-[500px] object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md text-white p-4 rounded-b-lg ">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="mt-1">$ {item.price}</p>
                  </div>
                </div>
              </Link>
            </div>
            </SwiperSlide>
          ))}
        
        </Swiper>

        </div>
        
      </section>
    </>
  );
}

export default NewArrival;
