import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import { Auth } from "./components/auth";
import { db, auth, storage } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);
  //<------------firestore-database------------------->
  const movieCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(movieCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  //<------------New-Movie-Status-------------------->
  const [movietitle, setMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
  //<-------------update-movie-status----------------->
  const [updatedTitle, setUpdatedTitle] = useState("");
  //<------------file-upload-Staus------------>
  const [fileUpload, setFileUpload] = useState(null);

  //eslint-disable-next-line
  useEffect(() => {
    getMovieList();
  }, []);

  //<--------------adddoc refers that whatever input is given
  //by user is stored in the firebase database---------------->
  const onSubmitMovie = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: movietitle,
        ReleaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };
  //<-------------------delete-option-for-movies------------------->
  const DeleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };
  //<-------------------update-section------------------------------>
  const updateMovieTitle = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, { title: updatedTitle });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };
  //<----------------upload-section---------------------------->
  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFile/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };
  //<---------------------return-section---------------------->
  return (
    <div className="App">
      <Auth />
      <div>
        {/* movie title */}
        <input
          type="text"
          placeholder="Enter Movie...."
          onChange={(e) => {
            setMovieTitle(e.target.value);
          }}
        />
        {/* Releaseddate */}
        <input
          type="number"
          placeholder="Released-Date"
          onChange={(e) => {
            setNewReleaseDate(Number(e.target.value));
          }}
        />
        {/* isNewMovieOscar */}
        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label>ReceivedAnOscar</label>
        <button onClick={onSubmitMovie}>Submit</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Date:{movie.ReleaseDate}</p>
            <button onClick={() => DeleteMovie(movie.id)}>Delete Movie</button>
            <input
              type="text"
              placeholder="New Title"
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateMovieTitle(movie.id)}>
              Update Title
            </button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files)} />
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
