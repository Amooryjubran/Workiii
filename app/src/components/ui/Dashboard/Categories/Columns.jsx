import Button from "@/components/Button";
import styles from "./style.module.css";
import DeleteImg from "images/Dashboard/delete.svg";
import EditImg from "images/Dashboard/edit.svg";
import Image from "@/components/Image";
export const Columns = [
  {
    Header: "#",
    accessor: (_, rowIndex) => rowIndex + 1,
    id: "rowIndex",
  },
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Services",
    accessor: "numberOfServices",
  },
  {
    Header: "Certificate Required",
    accessor: "certificateReuired",
    Cell: (
      { value } // eslint-disable-line react/prop-types
    ) => (
      <div
        className={`${styles.certificateStatus} ${
          value ? styles.certificateRequired : styles.certificateNotRequired
        }`}
      >
        {value ? "Required" : "Non"}
      </div>
    ),
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Actions",
    id: "actions",
    Cell: () => (
      <div className={styles.actionsBtns}>
        <Button>
          <Image src={EditImg} alt="Edit" />
          <span>Edit</span>
        </Button>
        <Button>
          <Image src={DeleteImg} alt="Delete" />
          <span>Delete</span>
        </Button>
      </div>
    ),
  },
];
