import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Star } from 'lucide-react';

const TESTIMONIALS_DATA = [
  { id: 1, name: "Olek", stars: 5, text: "Wszystko spodobało się. Polecam" },
  { id: 2, name: "Michał", stars: 5, text: "Z całego serca polecam, skuteczny masaż, miła atmosfera i pełen profesjonalizm." },
  { id: 3, name: "Magdalena", stars: 5, text: "Polecam wszystkim „spiętym” osobom ❤️" },
  { id: 4, name: "Justyna", stars: 5, text: "Ulga dla pleców, polecam ❤️" },
  { id: 5, name: "Daniel", stars: 5, text: "Z czystym sumieniem polecam, pełen profesjonalizm. Dawno nie byłem na tak dobrym masażu 🙂" }
];

const TestimonialCard = ({ name, stars, text }) => (
  <article className="group relative w-[300px] md:w-[380px] h-full flex-shrink-0 bg-white/80 backdrop-blur-md p-8 rounded-[2rem] border border-moss/5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-default">
    <div className="flex mb-4">
      {[...Array(stars)].map((_, i) => (
        <Star key={i} size={16} className="fill-olive text-olive" />
      ))}
    </div>
    <div className="relative mb-6">
      <p className="font-inter text-moss/90 leading-relaxed relative z-10">
        {text}
      </p>
    </div>
    <div className="mt-auto pt-6 border-t border-moss/10">
      <h4 className="font-fraunces text-xl text-moss">{name}</h4>
    </div>
  </article>
);

const Testimonials = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const isHoveredRef = useRef(false);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Clone first 3 items for seamless looping
  const DISPLAY_DATA = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA.slice(0, 3)];

  const nextSlide = () => {
    if (isHoveredRef.current || prefersReducedMotion) return;
    const nextIdx = currentIndexRef.current + 1;
    setCurrentIndex(nextIdx);
    currentIndexRef.current = nextIdx;
  };

  useGSAP(() => {
    if (!trackRef.current || prefersReducedMotion) return;

    const cards = Array.from(trackRef.current.children);
    const targetCard = cards[currentIndex];
    if (!targetCard) return;

    // The cards are flex items with gap-6. offsetLeft gives us the position.
    const targetX = -targetCard.offsetLeft;

    gsap.to(trackRef.current, {
      x: targetX,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        // If we reached the cloned items (index == original length), jump back to real index 0
        if (currentIndex === TESTIMONIALS_DATA.length) {
          gsap.set(trackRef.current, { x: 0 });
          setCurrentIndex(0);
          currentIndexRef.current = 0;
        }
      }
    });
  }, { dependencies: [currentIndex], scope: sectionRef });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <section 
      ref={sectionRef} 
      className="py-24 relative overflow-hidden"
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <h2 className="font-fraunces text-4xl md:text-6xl text-moss mb-12 text-center md:text-left">
          Wasze opinie
        </h2>
        
        <div className="relative overflow-hidden max-w-full md:max-w-[1188px] py-10 -my-10">
          <div 
            ref={trackRef}
            className="flex gap-6 will-change-transform"
          >
            {DISPLAY_DATA.map((t, idx) => (
              <div key={`${t.id}-${idx}`} className="flex-shrink-0">
                <TestimonialCard {...t} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
