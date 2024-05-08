import CleaningImg from "images/Home/cleaningJob.svg";
import ElectricianImg from "images/Home/electricianJob.svg";
import PaintingImg from "images/Home/paintingJob.svg";

const getServicesData = (t) => [
  {
    img: CleaningImg,
    alt: t("landingPage.cleaning"),
    title: t("landingPage.cleaningServices"),
    description: t("landingPage.cleaningDescription"),
    link: "services/cleaning",
  },
  {
    img: ElectricianImg,
    alt: t("landingPage.electrician"),
    title: t("landingPage.electricalServices"),
    description: t("landingPage.electricalDescription"),
    link: "services/electrical",
  },
  {
    img: PaintingImg,
    alt: t("landingPage.painting"),
    title: t("landingPage.paintingServices"),
    description: t("landingPage.paintingDescription"),
    link: "services/painting",
  },
  {
    img: PaintingImg,
    alt: t("landingPage.painting"),
    title: t("landingPage.paintingServices"),
    description: t("landingPage.paintingDescription"),
    link: "services/painting",
  },
  {
    img: ElectricianImg,
    alt: t("landingPage.electrician"),
    title: t("landingPage.electricalServices"),
    description: t("landingPage.electricalDescription"),
    link: "services/electrical",
  },
];

export default getServicesData;
