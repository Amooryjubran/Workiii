import PropTypes from "prop-types";
import styles from "./style.module.css";
import { useTranslation } from "react-i18next";
import { Heart } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useServicesStore from "@/store/Services/useServicesStore";
import Image from "@/components/Image";
import Button from "@/components/Button";
import LinkButton from "@/components/Link";
import StarImg from "images/Service/star.svg";
import LocationImg from "images/Service/location.svg";
import Arrow from "images/chev.svg";
import useUserStore from "@/store/useUserStore";
import { useState } from "react";
import { showToast } from "@/utils/showToast";
export default function ServiceCard({ service }) {
  const { t } = useTranslation();
  const { user } = useUserStore();
  const { addToWishlist, removeFromWishlist } = useServicesStore();
  const {
    serviceInfo,
    ratings,
    location,
    userName,
    userProfileImg,
    _id,
    images,
    isWishlisted,
  } = service;
  const { serviceTitle, servicePrice, serviceCategory } = serviceInfo;
  const [isInWishlist, setIsInWishlist] = useState(isWishlisted);
  const handleWishList = async (e, serviceID) => {
    e.preventDefault();
    let userID = user?._id;

    if (!userID) {
      showToast("error", `${t("services.Login")}!`);
      return;
    }
    try {
      if (!isInWishlist) {
        await removeFromWishlist(userID, serviceID);
        setIsInWishlist(false);
        showToast("info", "Item Removed");
      } else {
        await addToWishlist(userID, serviceID);
        setIsInWishlist(true);
        showToast("success", "Item Added");
      }
    } catch (error) {
      toast.error("Error updating wishlist", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className={styles.serviceCard}>
      <Image
        src={images[0]?.src}
        alt={service.serviceInfo.serviceTitle}
        classNameWrapper={styles.serviceCardImg}
      />
      <div className={styles.serviceCardHeader}>
        <div className={styles.serviceCardHeaderInfo}>
          <h1>{serviceTitle}</h1>
          <div className={styles.headerRating}>
            <Image src={StarImg} alt="ratings" />
            {ratings?.length == 0 ? 0 : ratings?.length}({ratings?.length})
          </div>
        </div>
        <div className={styles.headerInfoLocation}>
          <Image src={LocationImg} alt={location?.city} />
          {location.city && location.state
            ? `${location.city}, ${location.state}`
            : location.city || location.state || ""}
        </div>
        <div className={styles.headerInfoProfile}>
          {userProfileImg ? (
            <Image src={userProfileImg} alt={userName} />
          ) : (
            <div className={styles.headerInfoImg}>{userName.charAt(0)}</div>
          )}
          <span>{userName}</span>
        </div>
      </div>
      <div className={styles.serviceCardFooter}>
        <h1>${servicePrice}</h1>
        <LinkButton to={`service/${_id}`} className={styles.serviceLink}>
          <span>{t("services.BookNow")}</span>
          <Image src={Arrow} alt={"Arrow"} />
        </LinkButton>
      </div>
      <div className={styles.serviceNav}>
        <span>{serviceCategory}</span>
        <Button
          className={styles.serviceNavBtn}
          onClick={(e) => handleWishList(e, _id)}
        >
          <Heart className={isWishlisted ? styles.activeHeart : styles.heart} />
        </Button>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
ServiceCard.propTypes = {
  service: PropTypes.shape({
    serviceInfo: PropTypes.shape({
      serviceTitle: PropTypes.string.isRequired,
      servicePrice: PropTypes.string.isRequired,
      serviceCategory: PropTypes.string.isRequired,
    }),
    ratings: PropTypes.arrayOf(PropTypes.object),
    location: PropTypes.shape({
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
    }),
    userName: PropTypes.string.isRequired,
    userProfileImg: PropTypes.string,
    _id: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
};
