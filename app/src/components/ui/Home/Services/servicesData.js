import CleaningImg from "images/Home/cleaningJob.svg";
import ElectricianImg from "images/Home/electricianJob.svg";
import PaintingImg from "images/Home/paintingJob.svg";

const getServicesData = (t) => [
  {
    img: "https://plus.unsplash.com/premium_photo-1663013675008-bd5a7898ac4f?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: t("landingPage.cleaning"),
    title: t("landingPage.cleaningServices"),
    description: t("landingPage.cleaningDescription"),
    link: "services/cleaning",
  },
  {
    img: "https://images.pexels.com/photos/5691553/pexels-photo-5691553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: t("landingPage.electrician"),
    title: t("landingPage.electricalServices"),
    description: t("landingPage.electricalDescription"),
    link: "services/electrical",
  },
  {
    img: "https://images.pexels.com/photos/6474504/pexels-photo-6474504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: t("landingPage.painting"),
    title: t("landingPage.paintingServices"),
    description: t("landingPage.paintingDescription"),
    link: "services/painting",
  },
  {
    img: "https://images.unsplash.com/photo-1628158088791-89567a8e84ec?q=80&w=2892&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: t("landingPage.painting"),
    title: t("landingPage.paintingServices"),
    description: t("landingPage.paintingDescription"),
    link: "services/painting",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1661664806712-d0403ea8af18?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D",
    alt: t("landingPage.electrician"),
    title: t("landingPage.electricalServices"),
    description: t("landingPage.electricalDescription"),
    link: "services/electrical",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1661664806712-d0403ea8af18?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D",
    alt: t("landingPage.electrician"),
    title: t("landingPage.electricalServices"),
    description: t("landingPage.electricalDescription"),
    link: "services/electrical",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1661664806712-d0403ea8af18?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D",
    alt: t("landingPage.electrician"),
    title: t("landingPage.electricalServices"),
    description: t("landingPage.electricalDescription"),
    link: "services/electrical",
  },
];

export default getServicesData;
