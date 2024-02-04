import { useTranslation } from "react-i18next";
import ProfileTabs from "@/components/ui/Dashboard/ProfileTabs";
import Bookings from "@/components/ui/Dashboard/ProfileTabs/Bookings";
import Profile from "@/components/ui/Dashboard/ProfileTabs/Profile";
import BookingImg from "images/Dashboard/bookingProfile.svg";
import ProfileImg from "images/Dashboard/profile.svg";

// Import or define the components for each tab

export default function MyProfile() {
  // Define the tabs with labels and corresponding components
  const { t } = useTranslation();

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

  return (
    <div>
      <ProfileTabs tabs={tabs} />
    </div>
  );
}
