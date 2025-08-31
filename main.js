import testimonialSlide from "./utils/testimonial-slide.js";

const slides = document.querySelectorAll('.slide');

testimonialSlide.createAutoSlider(slides.length, (index) => {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? 'block' : 'none';
  });
})