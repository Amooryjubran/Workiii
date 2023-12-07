import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import styles from "./style.module.css";
import TableComponent from "./Table";
import { Columns } from "./Columns";
import Header from "./Header";
import Modal from "./Modal";
import { useTranslation } from "react-i18next";
export default function Categories() {
  const { t } = useTranslation();

  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({
    category: "",
    certificate: false,
  });
  const { data: categories } = useFetch(
    `${import.meta.env.VITE_API}/api/getCategories`
  );
  let categoroesList = categories?.data?.categories;

  if (!categoroesList) {
    return null;
  }
  const columns = Columns(setModalData, setModal, styles, t);
  return (
    <div>
      <Header setModal={setModal} />
      <TableComponent
        columns={columns}
        data={categoroesList}
        setModalData={setModalData}
      />
      {modal && (
        <Modal
          category={modalData.category}
          certificate={modalData.certificateReuired}
          setModal={setModal}
          setModalData={setModalData}
        />
      )}
    </div>
  );
}
