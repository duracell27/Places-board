import { useState } from "react";
import styles from "./App.module.scss";
import {
  useGetPostsQuery,
  useAddPostMutation,
  useDeletePostMutation,
} from "./redux/postsApi";

function App() {
  const { data = [], isLoading } = useGetPostsQuery();
  const [addPost] = useAddPostMutation();
  const [deletePost] = useDeletePostMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  const addPosthandler = async () => {
    if (title && description && imgSrc) {
      await addPost({
        title,
        description,
        img: imgSrc,
      }).unwrap();
      setDescription("");
      setTitle("");
      setImgSrc("");
    }
  };

  const removePosthandler = async (id) => {
    await deletePost(id).unwrap();
  };
  if (isLoading) return <h2>Загрузка</h2>;
  return (
    <div className={styles.App}>
      <div className={styles.inputsContainer}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заголовок"
        ></input>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Опис"
        ></input>
        <label htmlFor="file">
          Виберіть картинку
          <input
            id="file"
            value={""}
            onChange={(e) => setImgSrc(e.target.files[0].name)}
            style={{ visibility: "hidden" }}
            type="file"
          ></input>
        </label>
      </div>
      <button className={styles.addButton} onClick={addPosthandler}>
        Створити пост
      </button>
      <ul className={styles.cardsContainer}>
        {data.map((item) => (
          <li key={item.id} className={styles.cardItem}>
            <img src={require(`./assets/${item.img}`)} alt="pic" />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <span className={styles.deleteBtn} onClick={() => removePosthandler(item.id)}>видалити</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
