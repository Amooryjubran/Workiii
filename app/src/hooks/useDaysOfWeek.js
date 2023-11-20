import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const useDaysOfWeek = () => {
  const { t } = useTranslation();

  const daysOfWeek = useMemo(
    () => [
      t("listAServiceServicesTab.allDays"),
      t("listAServiceServicesTab.sunday"),
      t("listAServiceServicesTab.monday"),
      t("listAServiceServicesTab.tuesday"),
      t("listAServiceServicesTab.wednesday"),
      t("listAServiceServicesTab.thursday"),
      t("listAServiceServicesTab.friday"),
      t("listAServiceServicesTab.saturday"),
    ],
    [t]
  );

  return daysOfWeek;
};

export default useDaysOfWeek;
