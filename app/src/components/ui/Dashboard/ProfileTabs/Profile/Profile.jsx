import { useState, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from "./style.module.css";
import useUserStore from "@/store/useUserStore";
import ImageUploadImg from "images/ListAService/image-upload.svg";
import { X } from "react-feather";
import Image from "@/components/Image";
import Input from "@/components/Input";
import Button from "@/components/Button";
import UserInputs from "./UserInputs";

export default function Profile() {
  const { t } = useTranslation();
  const { user } = useUserStore();
  const { name, profileImg, phoneNumber, email, dateOfBirth } = user;
  const fileInputRef = useRef(null);
  const [userImg, setUserImg] = useState(profileImg);

  const [isDragging, setIsDragging] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Assuming you want to read the first image file
      const file = e.dataTransfer.files[0];
      setUserImg(URL.createObjectURL(file));
      e.dataTransfer.clearData();
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUserImg(URL.createObjectURL(file));
    }
  };
  const handleRemoveImg = () => {
    setUserImg(null);
  };
  const renderUser = () => {
    return userImg ? (
      <>
        <Button className={styles.removeProfileImg} onClick={handleRemoveImg}>
          <X size={18} />
        </Button>
        <Image
          src={userImg}
          alt={name}
          className={styles.profileImg}
          classNameWrapper={styles.profileImg}
        />
      </>
    ) : (
      <div className={styles.profileInitial}>{name?.charAt(0)}</div>
    );
  };

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
          name="upload image"
          ref={fileInputRef}
          value=""
        />
        <label htmlFor="fileInput" className={styles.uploadInput}>
          <Button className={styles.uploadBtn} onClick={handleButtonClick}>
            <Image
              src={ImageUploadImg}
              alt={t("listAServiceServicesTab.drag")}
              classNameWrapper={styles.imageIcon}
            />
          </Button>
        </label>
      </div>
      <div className={styles.profileInputs}>
        <UserInputs />
      </div>
    </div>
  );
}
