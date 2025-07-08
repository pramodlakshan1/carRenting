import React, { useEffect, useState, useRef } from "react";

const cars = [
  {
    id: 1,
    title: "BMW 520d",
    price: "$150/Day",
    km: "100 Km Per Day",
    image: "https://carsguide.ikman.lk/wp-content/uploads/2024/05/520d-featured-1-540x370.jpg",
  },
  {
    id: 2,
    title: "Audi A6",
    price: "$160/Day",
    km: "120 Km Per Day",
    image: "https://bestcar.co.ke/wp-content/webp-express/webp-images/uploads/2024/09/455834630_971185921475582_8102908782433385556_n.jpg.webp",
  },
  {
    id: 3,
    title: "Mercedes C-Class",
    price: "$170/Day",
    km: "110 Km Per Day",
    image: "https://i.ytimg.com/vi/8TDXmaq_1-Q/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAYK7ZNJek0ezkTzea3I2fajGuWGA",
  },
  {
    id: 4,
    title: "Tesla Model S",
    price: "$180/Day",
    km: "150 Km Per Day",
    image: "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=70/9004500a220bf3a3d455d15ee052cf8c332606f8/photos/rbbPYbQy-su0OPP7m1T-(edit).jpg?t=169795283235",
  },
];

function TrendingCar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);

  // Create infinite loop by adding clones at both ends
  const slides = [cars[cars.length - 1], ...cars, cars[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering && !isTransitioning) {
        setActiveIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          
          // If we're at the last clone, reset to 1 (original first item) without animation
          if (newIndex === slides.length - 1) {
            setIsTransitioning(true);
            setTimeout(() => {
              setActiveIndex(1);
              setIsTransitioning(false);
            }, 700);
          }
          return newIndex;
        });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovering, isTransitioning, slides.length]);

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => prev - 1);
    setTimeout(() => {
      // If we're at the first clone, reset to last original item
      if (activeIndex === 1) {
        setActiveIndex(slides.length - 2);
      }
      setIsTransitioning(false);
    }, 700);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => prev + 1);
    setTimeout(() => {
      // If we're at the last clone, reset to first original item
      if (activeIndex === slides.length - 2) {
        setActiveIndex(1);
      }
      setIsTransitioning(false);
    }, 700);
  };

  const getCardStyle = (index) => {
    const offset = index - activeIndex;
    const absOffset = Math.abs(offset);
    
    if (absOffset > 1) return { display: 'none' };
    
    return {
      transform: `translateX(${offset * 100}%) scale(${1 - absOffset * 0.1})`,
      zIndex: 3 - absOffset,
      opacity: 1 - absOffset * 0.3,
      filter: absOffset > 0 ? 'brightness(0.7)' : 'none',
      transition: isTransitioning ? 'all 700ms ease-in-out' : 'none'
    };
  };

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4 overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8 self-start text-gray-100">
        Drive Most Favorite and Trending Cars
      </h2>

      <div 
        className="relative w-[65%] flex-1 flex items-center justify-center"
        ref={containerRef}
      >
        {/* Navigation Arrows */}
        <button 
          onClick={handlePrev}
          className="absolute left-4 z-10 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={handleNext}
          className="absolute right-4 z-10 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Carousel Container */}
        <div className="relative w-full h-[60vh] max-w-4xl mx-auto">
          {slides.map((car, index) => (
            <div
              key={`${car.id}-${index}`}
              className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out ${index === activeIndex ? 'cursor-pointer' : 'pointer-events-none'}`}
              style={getCardStyle(index)}
              onMouseEnter={() => index === activeIndex && setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="relative h-full rounded-2xl overflow-hidden transition-all duration-500 group">
                {/* Background Image with Gradient Overlay */}
                <img
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={car.image}
                  alt={car.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Content Overlay - Only fully visible for active card */}
                <div className={`absolute bottom-0 left-0 right-0 p-6 text-white transition-all duration-300 ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="mb-4">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 transition-all duration-300 group-hover:text-blue-400">
                      {car.title}
                    </h3>
                    <div className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0">
                      <p className="flex items-center text-base md:text-lg">
                        <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {car.price}
                      </p>
                      <p className="flex items-center text-base md:text-lg">
                        <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        {car.km}
                      </p>
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-xl">
                    Rent Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-end mt-4 md:mt-8">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 md:py-3 md:px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          View All Vehicles →
        </button>
      </div>
    </div>
  );
}

export default TrendingCar;