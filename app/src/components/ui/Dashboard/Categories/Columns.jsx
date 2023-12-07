import Button from "@/components/Button";
import DeleteImg from "images/Dashboard/delete.svg";
import EditImg from "images/Dashboard/edit.svg";
import Image from "@/components/Image";

export const Columns = (
  setModalData,
  setModal,
  styles,
  t,
  setCategoryData,
  setDeleteModal
) => {
  return [
    {
      Header: t("dashboard.Number"),
      accessor: (_, rowIndex) => rowIndex + 1,
      id: "rowIndex",
    },
    {
      Header: t("dashboard.Category"),
      accessor: "category",
    },
    {
      Header: t("dashboard.Services"),
      accessor: "numberOfServices",
    },
    {
      Header: t("dashboard.CertificateRequired"),
      accessor: "certificateRequired",
      Cell: (
        { value } // eslint-disable-line react/prop-types
      ) => (
        <div
          className={`${styles.certificateStatus} ${
            value ? styles.certificateRequired : styles.certificateNotRequired
          }`}
        >
          {value ? t("dashboard.Required") : t("dashboard.Non")}
        </div>
      ),
    },
    {
      Header: t("dashboard.Status"),
      accessor: "status",
    },
    {
      Header: t("dashboard.Actions"),
      id: "actions",
      Cell: (
        { row } // eslint-disable-line react/prop-types
      ) => {
        return (
          <div className={styles.actionsBtns}>
            <Button
              onClick={() => {
                setModalData(row.original); // eslint-disable-line react/prop-types
                setModal(true);
              }}
            >
              <Image src={EditImg} alt={t("dashboard.Edit")} />
              <span>{t("dashboard.Edit")}</span>
            </Button>
            <Button
              onClick={() => {
                setCategoryData(row.original); // eslint-disable-line react/prop-types
                setDeleteModal(true);
              }}
            >
              <Image src={DeleteImg} alt={t("dashboard.Delete")} />
              <span>{t("dashboard.Delete")}</span>
            </Button>
          </div>
        );
      },
    },
  ];
};
