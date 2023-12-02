import styles from "./style.module.css";
import Image from "@/components/Image";
import Input from "@/components/Input";
import SearchImg from "images/Dashboard/search.svg";
export default function Search() {
  return (
    <div className={styles.searchInput}>
      <Image src={SearchImg} alt="Search" />
      <Input
        className={styles.searchContainer}
        placeholder="Search here"
        value=""
        name=""
        onChange={(e) => console.log(e.target.value)}
      />
    </div>
  );
}
