import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useUserStore from "@/store/useUserStore";
import { useNavigate } from "react-router-dom";
import i18n from "@/config/i18n";
import ProfileTabs from "@/components/ui/Dashboard/ProfileTabs";
import Bookings from "@/components/ui/Dashboard/ProfileTabs/Bookings";
import Profile from "@/components/ui/Dashboard/ProfileTabs/Profile";
import BookingImg from "images/Dashboard/bookingProfile.svg";
import ProfileImg from "images/Dashboard/profile.svg";

export default function MyProfile() {
  const { t } = useTranslation();
  const { user } = useUserStore();
  const navigate = useNavigate();
  const currentLanguage = i18n.language;

  const tabs = [
    {
      label: t("profile.MyProfile"),
      image: ProfileImg,
      component: <Profile />,
    },
    {
      label: t("dashboard.Bookings"),
      image: BookingImg,
      component: <Bookings />,
    },
  ];

  useEffect(() => {
    if (!user) {
      navigate(`/${currentLanguage}/login`);
    }
  }, [user, navigate, currentLanguage]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <ProfileTabs tabs={tabs} />
    </div>
  );
}
