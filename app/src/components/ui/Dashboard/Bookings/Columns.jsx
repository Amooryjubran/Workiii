import Button from "@/components/Button";
import DeleteImg from "images/Dashboard/delete.svg";
import DetailsImg from "images/Dashboard/details.svg";
import Image from "@/components/Image";
import moment from "moment";
import CheckMark from "images/Dashboard/approve.svg";
import useBookingsStore from "@/store/Dashboard/useBookings";

export const Columns = (styles, t) => {
  return [
    {
      Header: "#",
      accessor: (_, rowIndex) => rowIndex + 1,
      id: "rowIndex",
    },
    {
      Header: t("dashboard.User"),
      accessor: "clientInformation",
      Cell: (
        { value } // eslint-disable-line react/prop-types
      ) => {
        if (!value) return null;
        const { profileImg, name } = value;
        return (
          <div className={styles.userProfile}>
            {profileImg ? (
              <Image src={profileImg} />
            ) : (
              <div className={styles.userProfileImg}>
                {name?.substring(0, 1)}
              </div>
            )}
            <span>{name}</span>
          </div>
        );
      },
    },
    {
      Header: t("dashboard.Services"),
      accessor: "serviceInfo",
      Cell: (
        { value } // eslint-disable-line react/prop-types
      ) => {
        if (!value) return null;
        const { category, image } = value; // eslint-disable-line react/prop-types

        return (
          <div className={styles.userProfile}>
            <div className={styles.serviceImg}>
              {image ? (
                <Image
                  src={image}
                  alt={category}
                  className={styles.serviceImgs}
                  classNameWrapper={styles.serviceImgsWrapper}
                />
              ) : (
                <div className={styles.userProfileImg}>
                  {category?.substring(0, 1)}
                </div>
              )}
              <span>{category}</span>
            </div>
          </div>
        );
      },
    },
    {
      Header: t("dashboard.Date"),
      accessor: "reservationDate",
      Cell: (
        { value } // eslint-disable-line react/prop-types
      ) => {
        if (!value) return null;
        const { day, hours } = value; // eslint-disable-line react/prop-types
        const renderHours = () => {
          if (hours.length > 1) {
            // eslint-disable-line react/prop-types
            return (
              <span>
                {hours[0]} - {hours[hours.length - 1]}
              </span>
            );
          } else if (hours.length === 1) {
            // eslint-disable-line react/prop-types
            return <span>{hours[0]}</span>;
          }
          return null;
        };
        return (
          <div className={styles.bookingDates}>
            <span>{moment(day).format(" MMMM Do YYYY")}</span>
            {renderHours()}
          </div>
        );
      },
    },
    {
      Header: t("dashboard.Amount"),
      accessor: "totalPrice",
    },
    {
      Header: t("dashboard.ServiceStatus"),
      accessor: "status",
    },
    {
      Header: t("dashboard.ServiceType"),
      accessor: "serviceInfo.category",
      Cell: (
        { value } // eslint-disable-line react/prop-types
      ) => {
        if (!value) return null;

        return <div className={styles.bookingCategory}>{value}</div>;
      },
    },
    {
      Header: t("dashboard.Actions"),
      id: "actions",
      Cell: (
        { row } // eslint-disable-line react/prop-types
      ) => {
        let clientID = row?.original?.clientID; // eslint-disable-line react/prop-types
        let clientOrder = row?.original; // eslint-disable-line react/prop-types
        let bookingID = row?.original?._id; // eslint-disable-line react/prop-types
        const { setClientTab } = useBookingsStore();
        return (
          <div className={styles.actionsBtns}>
            <Button
              className={styles.approve}
              // onClick={() => {
              //   setModalData(row.original); // eslint-disable-line react/prop-types
              //   setModal(true);
              // }}
            >
              <Image
                src={CheckMark}
                classNameWrapper={styles.img}
                alt={t("dashboard.Approve")}
              />
              <span>{t("dashboard.Approve")}</span>
            </Button>
            <Button
            // onClick={() => {
            //   setCategoryData(row.original); // eslint-disable-line react/prop-types
            //   setDeleteModal(true);
            // }}
            >
              <Image src={DeleteImg} alt={t("dashboard.Delete")} />
              <span>{t("dashboard.Delete")}</span>
            </Button>
            <Button
              className={styles.detailsLink}
              onClick={() => setClientTab(clientID, clientOrder, bookingID)}
            >
              <Image src={DetailsImg} alt={t("dashboard.Details")} />
              {t("dashboard.Details")}
            </Button>
          </div>
        );
      },
    },
  ];
};
