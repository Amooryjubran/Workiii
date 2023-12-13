import Button from "@/components/Button";
import Image from "@/components/Image";
import useServicesStore from "@/store/Dashboard/useServices";
import DetailsImg from "images/Dashboard/details.svg";
export const Columns = (styles, t) => {
  const { setServiceTab } = useServicesStore();

  return [
    {
      Header: "#",
      accessor: (_, rowIndex) => rowIndex + 1,
      id: "rowIndex",
    },
    {
      Header: t("dashboard.Service"),
      accessor: "serviceInfo.serviceTitle",
    },
    {
      Header: t("dashboard.Labrors"),
      accessor: "providerName",
    },
    {
      Header: t("dashboard.Amount"),
      accessor: "serviceInfo.servicePrice",
    },
    {
      Header: t("dashboard.ServiceState"),
      id: "status",
      Cell: (
        { row } // eslint-disable-line react/prop-types
      ) => {
        let status = row.original.status; // eslint-disable-line react/prop-types
        let className =
          status === "Pending"
            ? styles.pending
            : status === "Canceled"
            ? styles.cancelled
            : styles.approved;

        return <div className={className}>{status}</div>;
      },
    },
    {
      Header: t("dashboard.ServiceType"),
      id: "serviceInfo",
      Cell: (
        { row } // eslint-disable-line react/prop-types
      ) => {
        let type = row.original.serviceInfo.serviceCategory; // eslint-disable-line react/prop-types
        return <div className={styles.type}>{type}</div>;
      },
    },
    {
      Header: t("dashboard.State"),
      id: "serviceState",
      Cell: (
        { row } // eslint-disable-line react/prop-types
      ) => {
        return (
          <label className={styles.switch}>
            <input type="checkbox" />
            <span className={styles.round}></span>
          </label>
        );
      },
    },
    {
      Header: t("dashboard.Actions"),
      id: "actions",
      Cell: (
        { row } // eslint-disable-line react/prop-types
      ) => {
        let serviceId = row?.original?._id; // eslint-disable-line react/prop-types
        return (
          <Button
            className={styles.detailsLink}
            onClick={() => setServiceTab(serviceId)}
          >
            <Image src={DetailsImg} alt={t("dashboard.Details")} />
            {t("dashboard.Details")}
          </Button>
        );
      },
    },
  ];
};
