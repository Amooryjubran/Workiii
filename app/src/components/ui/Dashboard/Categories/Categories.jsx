import { useState, useEffect } from "react";
import styles from "./style.module.css";
import TableComponent from "./Table";
import { Columns } from "./Columns";
import Header from "./Header";
import Modal from "./Modal";
import { useTranslation } from "react-i18next";
import useCategoriesStore from "@/store/Dashboard/useCategories";
import DeleteModal from "./DeleteModal";

export default function Categories() {
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [modalData, setModalData] = useState({
    category: "",
    certificate: false,
  });
  const [categoryData, setCategoryData] = useState(null);
  const { categories, fetchCategories } = useCategoriesStore();

  useEffect(() => {
    fetchCategories();
  }, []);

  const columns = Columns(
    setModalData,
    setModal,
    styles,
    t,
    setCategoryData,
    setDeleteModal
  );
  return (
    <div>
      <Header setModal={setModal} />
      <TableComponent
        columns={columns}
        data={categories}
        setModalData={setModalData}
      />
      {modal && (
        <Modal
          category={modalData.category}
          certificate={modalData.certificate}
          setModal={setModal}
          setModalData={setModalData}
        />
      )}
      {deleteModal && (
        <DeleteModal
          setDeleteModal={setDeleteModal}
          categoryData={categoryData}
        />
      )}
    </div>
  );
}
