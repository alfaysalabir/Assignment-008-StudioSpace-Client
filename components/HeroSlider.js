"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa6";
import { FiArrowRight, FiZap } from "react-icons/fi";
import SafeImage from "@/components/SafeImage";
import { heroSlides } from "@/lib/data";

// New hero: split layout (text on the left, big rounded photo on the right)
export default function HeroSlider() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-accent2/20 blur-3xl" />

      <div className="container-x relative">
        <Swiper
          modules={[Autoplay, Pagination]}
          loop
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="!pb-14"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="grid items-center gap-10 py-6 lg:grid-cols-2 lg:py-12">
                <div>
                  <p className="eyebrow">{slide.eyebrow}</p>
                  <h1 className="font-display text-4xl font-bold leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
                    {slide.before} <span className="gradient-text">{slide.highlight}</span> {slide.after}
                  </h1>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">{slide.text}</p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link href="/studios" className="btn-primary">
                      Explore Studios <FiArrowRight />
                    </Link>
                    <Link href="/studios" className="btn-outline !px-6 !py-3">
                      Host Your Space
                    </Link>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
                    <span><b className="font-display text-xl text-ink">5</b> studio types</span>
                    <span><b className="font-display text-xl text-ink">1 hr</b> minimum</span>
                    <span><b className="font-display text-xl text-ink">0</b> double bookings</span>
                  </div>
                </div>

                <div className="relative">
                  <div className="overflow-hidden rounded-[2.5rem] border-4 border-surface shadow-2xl shadow-accent/20">
                    <SafeImage src={slide.image} alt="Creative studio" className="h-[300px] w-full object-cover sm:h-[420px] lg:h-[500px]" />
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-surface p-3 pr-5 shadow-xl">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400/20 text-amber-400">
                      <FaStar />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-ink">Top rated spaces</p>
                      <p className="text-xs text-muted">Loved by creators</p>
                    </div>
                  </div>
                  <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-semibold text-ink shadow-xl">
                    <FiZap className="text-accent" /> Live availability
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
