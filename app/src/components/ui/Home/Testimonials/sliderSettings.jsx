import { SampleNextArrow, SamplePrevArrow } from "./Arrows";

export const getSettings = (setCurrentIndex) => ({
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  beforeChange: (current, next) => setCurrentIndex(next),
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1.25,
        slidesToScroll: 1,
      },
    },
  ],
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
});

export const getItems = (t) => [
  {
    id: 1,
    name: t("home.testimonials.names.0"),
    role: t("home.testimonials.roles.0"),
    quote: t("home.testimonials.quotes.0"),
    image:
      "https://images.pexels.com/photos/6764270/pexels-photo-6764270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 2,
    name: t("home.testimonials.names.1"),
    role: t("home.testimonials.roles.1"),
    quote: t("home.testimonials.quotes.1"),
    image:
      "https://res.cloudinary.com/movieslify/image/upload/f_auto,q_auto/PHOTO-2024-03-16-14-29-21_xpygyu",
  },
  {
    id: 3,
    name: t("home.testimonials.names.2"),
    role: t("home.testimonials.roles.2"),
    quote: t("home.testimonials.quotes.2"),
    image:
      "https://images.unsplash.com/photo-1608681299041-cc19878f79f1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2xkJTIwbWFufGVufDB8fDB8fHww",
  },
  {
    id: 4,
    name: t("home.testimonials.names.3"),
    role: t("home.testimonials.roles.3"),
    quote: t("home.testimonials.quotes.3"),
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=3149&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
