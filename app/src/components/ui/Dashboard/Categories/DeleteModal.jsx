import PropTypes from "prop-types";
import styles from "./style.module.css";
import useCategoriesStore from "@/store/Dashboard/useCategories";
import useUserStore from "@/store/useUserStore";
import { useTranslation } from "react-i18next";
import Button from "@/components/Button";

export default function DeleteModal({ setDeleteModal, categoryData }) {
  const { deleteCategory } = useCategoriesStore();
  const { user } = useUserStore();
  const { t } = useTranslation();

  const handleDeleteCategory = () => {
    deleteCategory(user._id, categoryData._id);
    setDeleteModal(false);
  };
  return (
    <div className={styles.deleteCategoryModal}>
      <h1>{t("dashboard.DeleteCategory")}</h1>
      <p>
        {t("dashboard.DeleteCategorySure")}{" "}
        <strong>{categoryData.category}</strong>
      </p>
      <div className={styles.newCategoryModalBtns}>
        <Button onClick={() => setDeleteModal(false)}>
          {t("dashboard.Cancel")}
        </Button>
        <Button onClick={() => handleDeleteCategory()}>
          {t("dashboard.Delete")}
        </Button>
      </div>
    </div>
  );
}

DeleteModal.propTypes = {
  setDeleteModal: PropTypes.func.isRequired,
  categoryData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
};
