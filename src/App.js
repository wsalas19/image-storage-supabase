import "./styles.css";
import { v4 as uuidv4 } from "uuid";
import { useState, useRef, useEffect } from "react";
import { supabase } from "./config/supabase";

export default function App() {
  //state
  const [file, setFile] = useState({});
  const [images, setImages] = useState([]);
  const inputRef = useRef(null);
  const fetched = useRef(false);
  const BucketURL =
    "https://zjfiouexnmcnwltbzgyi.supabase.co/storage/v1/object/public/image-bucket/";
  //hanlders
  const handleSubmit = async (e) => {
    e.preventDefault();
    const filename = `${uuidv4()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("image-bucket")
      .upload(filename, file, {
        cacheControl: "3600",
        upsert: false
      });
    inputRef.current.value = "";
    fetchAllFiles();
    if (data) console.log(data);
    else {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const fetchAllFiles = async () => {
    const { data: files, error } = await supabase.storage
      .from("image-bucket")
      .list("");
    if (error) {
      console.error(error);
      return;
    }

    // Do something with the list of files
    setImages(files);
  };

  useEffect(() => {
    if (fetched.current) {
      return;
    }
    fetched.current = true;
    fetchAllFiles();
    console.log("data fetched! initial fetch");
  }, []);

  return (
    <div className="App">
      <form className="imageForm" onSubmit={handleSubmit}>
        <label>Upload your image!</label>
        <input
          ref={inputRef}
          name="image"
          onChange={handleChange}
          type="file"
        />
        <input type="submit" value="Upload" />
      </form>
      <div className="imageDiv">
        {images
          ? images.map((i) => {
              return (
                <img
                  className="imageRendered"
                  key={i.id}
                  src={BucketURL + i.name}
                  alt="supabase"
                />
              );
            })
          : null}
      </div>
    </div>
  );
}
