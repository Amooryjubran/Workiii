import { SampleNextArrow, SamplePrevArrow } from "./ArrowComponents";

export const sliderSettings = () => ({
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  autoplay: false,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});
