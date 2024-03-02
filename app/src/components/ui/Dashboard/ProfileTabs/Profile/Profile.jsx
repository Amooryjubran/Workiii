import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./style.module.css";
import useUserStore from "@/store/useUserStore";
import ImageUploadImg from "images/ListAService/image-upload.svg";
import { X } from "react-feather";
import Image from "@/components/Image";
import Input from "@/components/Input";
import Button from "@/components/Button";
import UserInputs from "./UserInputs";
import useProfileStore from "@/store/Profile/useProfileStore";

export default function Profile() {
  const { t } = useTranslation();
  const {
    userImg,
    setUserImg,
    isDragging,
    handleDragIn,
    handleDragOut,
    handleDragOver,
    handleDrop,
    handleRemoveImg,
    initializeFromUser,
    userName,
    userPhoneNumber,
    userEmail,
    userDateOfBirth,
    userAddress,
  } = useProfileStore();

  const { user } = useUserStore();
  const fileInputRef = useRef(null);

  useEffect(() => {
    initializeFromUser(user);
  }, [user, initializeFromUser]);

  // This function overrides the previous handleChange to use the store
  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUserImg(URL.createObjectURL(file));
    }
  };

  // This function makes an api call to make the changes
  const handleSaveChaged = () => {
    const newChanges = {
      name: userName,
      phoneNumber: userPhoneNumber,
      email: userEmail,
      dateOfBirth: userDateOfBirth,
      location: userAddress,
    };
    console.log(newChanges);
  };

  const renderUser = () => {
    return userImg ? (
      <>
        <Button className={styles.removeProfileImg} onClick={handleRemoveImg}>
          <X size={18} />
        </Button>
        <Image
          src={userImg}
          alt="Profile"
          className={styles.profileImg}
          classNameWrapper={styles.profileImg}
        />
      </>
    ) : (
      <div className={styles.profileInitial}>{user.name?.charAt(0)}</div>
    );
  };
  if (!user) {
    return null;
  }
  return (
    <div
      className={`${styles.container} ${isDragging ? styles.dragging : ""}`}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h1>{t("profile.profileTab.YourInformation")}</h1>
      <h2>{t("profile.profileTab.PersonalInformation")}</h2>
      <div className={styles.imageUpload}>
        <div>{renderUser()}</div>
        <Input
          type="file"
          onChange={handleChange}
          style={{ display: "none" }}
          id="fileInput"
          ref={fileInputRef}
        />
        <label htmlFor="fileInput" className={styles.uploadInput}>
          <Button
            className={styles.uploadBtn}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            <Image
              src={ImageUploadImg}
              alt={t("listAServiceServicesTab.drag")}
              classNameWrapper={styles.imageIcon}
            />
          </Button>
        </label>
      </div>
      <UserInputs />
      <div className={styles.profileActionBtns}>
        <Button onClick={handleSaveChaged}>
          {t("profile.profileTab.saveChanges")}
        </Button>
        <Button>{t("dashboard.Cancel")}</Button>
      </div>
    </div>
  );
}
