import Button from "@/components/Button";
import Image from "@/components/Image";
import useUsersStore from "@/store/Dashboard/useUsers";
import DetailsImg from "images/Dashboard/details.svg";
export const Columns = (styles, t) => {
  const { setUserTab } = useUsersStore();

  // Mapping user types to their CSS classes
  const userTypeStyles = {
    admin: styles.adminType,
    provider: styles.providerType,
    client: styles.clientType,
  };

  return [
    {
      Header: "#",
      accessor: (_, rowIndex) => rowIndex + 1,
      id: "rowIndex",
    },
    {
      Header: t("dashboard.User"),
      accessor: "name",
    },
    {
      Header: t("dashboard.Type"),
      id: "userType",
      Cell: (
        { row } // eslint-disable-line react/prop-types
      ) => {
        let userType = row?.original?.userType; // eslint-disable-line react/prop-types
        const specificClassName = userTypeStyles[userType] || "";
        const combinedClassName = `${styles.userType} ${specificClassName}`;

        return <div className={combinedClassName}>{userType}</div>;
      },
    },
    {
      Header: t("dashboard.PhoneNumber"),
      accessor: "phoneNumber",
    },
    {
      Header: t("dashboard.MemberSince"),
      id: "creationDate",
      Cell: (
        { row } // eslint-disable-line react/prop-types
      ) => {
        const formattedDate = new Date(
          row?.original?.creationDate // eslint-disable-line react/prop-types
        ).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        return <div>{formattedDate}</div>;
      },
    },
    {
      Header: t("dashboard.State"),
      accessor: "status",
    },
    {
      Header: t("dashboard.Actions"),
      id: "actions",
      Cell: (
        { row } // eslint-disable-line react/prop-types
      ) => {
        let userId = row?.original?._id; // eslint-disable-line react/prop-types
        return (
          <Button
            className={styles.detailsLink}
            onClick={() => setUserTab(userId)}
          >
            <Image src={DetailsImg} alt={t("dashboard.Details")} />
            {t("dashboard.Details")}
          </Button>
        );
      },
    },
  ];
};
