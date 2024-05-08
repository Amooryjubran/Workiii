import { SampleNextArrow, SamplePrevArrow } from "./ArrowComponents";

export const sliderSettings = () => ({
  infinite: false,
  speed: 500,
  arrows: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  autoplay: false,
  autoplaySpeed: 2500,
  responsive: [
    {
      breakpoint: true,
      settings: {
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});
