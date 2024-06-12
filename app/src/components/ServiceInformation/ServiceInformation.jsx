import { Suspense, lazy } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import styles from "./style.module.css";
import Gallery from "./Gallery";
import Details from "./Details";
import Providers from "./Providers";
import Sidebar from "./Sidebar";
import BookService from "./BookService";
import Button from "@/components/Button";
import { useTabs } from "@/hooks/useTabs";
import useBookServiceStore from "@/store/Services/useBookServiceStore";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { useTranslation } from "react-i18next";

// Lazy load Reviews and QA components
const ReviewsLazy = lazy(() => import("./Reviews"));
const QALazy = lazy(() => import("./QA"));

export default function ServiceInformation({ selectedService }) {
  const tabs = useTabs(0);
  const { t } = useTranslation();
  const { modal, setModal } = useBookServiceStore();
  const windowWidth = useWindowWidth();

  const {
    location,
    images,
    booking,
    serviceInfo,
    ratings,
    totalReviews,
    averageRating,
    reviewsImagesCount,
    providerName,
    dateCreated,
    pageType,
    frequentlyAskedQuestions,
    _id,
  } = selectedService;
  const { serviceTitle, serviceCategory, serviceDescription, servicePrice } =
    serviceInfo;
  let addressComponents = [
    location?.street,
    location?.city,
    location?.state,
    location?.country,
  ];
  let address = addressComponents.filter(Boolean).join(", ");
  let date = new Date(dateCreated);
  let memberSince = date.toLocaleString("default", {
    month: "short",
    year: "numeric",
  });
  const tabConfig = [
    {
      label: t("navbar.reviews"),
      component: (
        <ReviewsLazy
          ratings={ratings}
          totalReviews={totalReviews}
          averageRating={averageRating}
          reviewsImagesCount={reviewsImagesCount}
        />
      ),
    },
    {
      label: t("home.faq.title"),
      component: <QALazy frequentlyAskedQuestions={frequentlyAskedQuestions} />,
    },
  ];

  const OrderComponent = () => {
    return windowWidth >= 1028 ? (
      <>
        <Header
          location={location}
          serviceTitle={serviceTitle}
          serviceCategory={serviceCategory}
          ratings={ratings}
          pageType={pageType}
        />
        <Gallery images={images} />
      </>
    ) : (
      <>
        <Gallery images={images} />
        <Header
          location={location}
          serviceTitle={serviceTitle}
          serviceCategory={serviceCategory}
          ratings={ratings}
          pageType={pageType}
        />
      </>
    );
  };
  // Function to render tabs based on windowWidth
  const renderTabs = () => (
    <>
      <div className={styles.tabsButtons}>
        {tabConfig.map((tab, index) => (
          <Button
            key={index}
            onClick={() => tabs.setTab(index)}
            className={tabs.isCurrentTab(index) ? styles.activeTab : ""}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className={styles.tabsContent}>
          {tabConfig[tabs.currentTab].component}
        </div>
      </Suspense>
    </>
  );

  return (
    <div className={styles.serviceInformation}>
      <OrderComponent />
      <div className={styles.serviceBottom}>
        <div className={styles.serviceBottomWrapper}>
          <Details serviceDescription={serviceDescription} />
          <Providers
            name={providerName}
            date={memberSince}
            location={address}
          />
          {windowWidth >= 1028 && renderTabs()}
        </div>
        <Sidebar
          ratings={ratings}
          booking={booking}
          location={location}
          price={servicePrice}
          pageType={pageType}
          setModal={setModal}
          selectedService={selectedService}
        />
        {windowWidth < 1028 && renderTabs()}
      </div>
      {modal && <BookService setModal={setModal} serviceID={_id} />}
    </div>
  );
}

ServiceInformation.propTypes = {
  selectedService: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    location: PropTypes.shape({
      city: PropTypes.string,
      street: PropTypes.string,
      state: PropTypes.string,
      country: PropTypes.string,
      postalCode: PropTypes.string,
      latLng: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
      }),
    }).isRequired,
    pageType: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        isDefault: PropTypes.bool,
      })
    ),
    booking: PropTypes.objectOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          from: PropTypes.string,
          to: PropTypes.string,
        })
      )
    ),
    serviceInfo: PropTypes.shape({
      serviceTitle: PropTypes.string.isRequired,
      serviceCategory: PropTypes.string.isRequired,
      serviceDescription: PropTypes.string.isRequired,
      servicePrice: PropTypes.string.isRequired,
      serviceCertificate: PropTypes.string,
      serviceDuration: PropTypes.string,
    }).isRequired,
    ratings: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        date: PropTypes.string,
        title: PropTypes.string,
        rate: PropTypes.number.isRequired,
        review: PropTypes.string,
        images: PropTypes.arrayOf(PropTypes.object),
      })
    ),
    totalReviews: PropTypes.number.isRequired,
    averageRating: PropTypes.number.isRequired,
    reviewsImagesCount: PropTypes.number.isRequired,
    providerName: PropTypes.string.isRequired,
    dateCreated: PropTypes.string.isRequired,
    frequentlyAskedQuestions: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string,
        answer: PropTypes.string,
      })
    ),
  }).isRequired,
};
