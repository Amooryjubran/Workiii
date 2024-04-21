import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import styles from "./style.module.css";
import useUserStore from "@/store/useUserStore";
import ImageUploadImg from "images/ListAService/image-upload.svg";
import { X } from "react-feather";
import Image from "@/components/Image";
import Input from "@/components/Input";
import Button from "@/components/Button";
import UserInputs from "./UserInputs";
import useProfileStore from "@/store/Profile/useProfileStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "@/utils/showToast";

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
    setUserAddress,
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
  const handleSaveChaged = async () => {
    const id = user._id;
    const newChanges = {
      _id: id,
      name: userName,
      phoneNumber: userPhoneNumber,
      email: userEmail,
      dateOfBirth: userDateOfBirth,
      location: userAddress,
    };
    // Filter out fields that haven't changed
    const updatedFields = Object.entries(newChanges).reduce(
      (acc, [key, value]) => {
        if (value !== user[key]) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );
    if (Object.keys(updatedFields).length === 0) {
      // No fields have changed, so no need to make an API call
      return;
    }

    const updateUserProfileApi = async (userData) => {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API}/api/updateUserProfile`,
          userData
        );

        if (response.status !== 200) {
          throw new Error("Failed to update user profile");
        }
        showToast("success", t("profile.profileTab.Success"));
        return response.data;
      } catch (error) {
        toast.error(t("profile.profileTab.Error"), {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.error("Error updating user profile:", error);
        throw error;
      }
    };

    try {
      await updateUserProfileApi(newChanges);
      // Update localStorage after successful update
      const updatedUser = { ...user, ...updatedFields };
      if (userAddress) {
        setUserAddress(userAddress);
      }
      useUserStore.getState().setUser(updatedUser);
      console.log(updatedUser);
    } catch (error) {
      console.error("Error updating user profile:", error);
      // Handle error
    }
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
          name="profileImg"
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
        <Button
          className={styles.profileActionBtnSave}
          onClick={handleSaveChaged}
        >
          {t("profile.profileTab.saveChanges")}
        </Button>
        <Button className={styles.profileActionBtnCancel}>
          {t("dashboard.Cancel")}
        </Button>
      </div>
      <div className={styles.toast} style={{ bottom: "-10px" }}>
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
    </div>
  );
}
