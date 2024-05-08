import { SampleNextArrow, SamplePrevArrow } from "./ArrowComponents";

export const sliderSettings = (setMiddleIndex, servicesLength) => ({
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  autoplay: true,
  autoplaySpeed: 2500,
  beforeChange: (current, next) => {
    setMiddleIndex((next + 1) % servicesLength);
  },
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        arrows: false,

        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => {
          setMiddleIndex(next % servicesLength);
        },
      },
    },
  ],
});
