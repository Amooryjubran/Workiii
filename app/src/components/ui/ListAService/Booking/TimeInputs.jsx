import PropTypes from "prop-types";
import styles from "./style.module.css";
import { useTranslation } from "react-i18next";
import Button from "@/components/Button";
import Image from "@/components/Image";
import TimeSelect from "./TimeSelect";
import RemoveImg from "images/ListAService/trash.svg";
import PlustImg from "images/ListAService/plus-circle.svg";

const TimeInputs = ({
  selectedDay,
  booking,
  onAddHours,
  onUpdateHours,
  onRemoveHours,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.timeInputs}>
      {booking[selectedDay]?.map((hours, index) => (
        <div key={index} className={styles.timeSlot}>
          <div>
            <span>{t("listAServiceServicesTab.from")}</span>
            <TimeSelect
              value={hours.from}
              onChange={(newValue) => onUpdateHours(index, "from", newValue)}
            />
          </div>
          <div>
            <span>{t("listAServiceServicesTab.to")}</span>
            <TimeSelect
              value={hours.to}
              onChange={(newValue) => onUpdateHours(index, "to", newValue)}
            />
          </div>
          {hours.from && hours.to && (
            <Button
              onClick={() => onRemoveHours(index)}
              className={styles.removeBtn}
            >
              <Image
                src={RemoveImg}
                alt={t("listAServiceServicesTab.remove")}
              />
            </Button>
          )}
        </div>
      ))}
      <Button className={styles.addHoursBtn} onClick={onAddHours}>
        <Image src={PlustImg} alt={t("listAServiceServicesTab.addHours")} />
        {t("listAServiceServicesTab.addHours")}
      </Button>
    </div>
  );
};

TimeInputs.propTypes = {
  selectedDay: PropTypes.string.isRequired,
  booking: PropTypes.oneOfType([
    PropTypes.objectOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          from: PropTypes.string,
          to: PropTypes.string,
        })
      )
    ),
    PropTypes.arrayOf(PropTypes.exact({})),
  ]).isRequired,
  onAddHours: PropTypes.func.isRequired,
  onUpdateHours: PropTypes.func.isRequired,
  onRemoveHours: PropTypes.func.isRequired,
};

export default TimeInputs;
