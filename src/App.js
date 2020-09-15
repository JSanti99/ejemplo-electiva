import React, { useState, useEffect } from "react";
import { consumerFirebase } from "./context/firebaseContext";
import { v4 } from "uuid";
import ImageUploader from "react-images-upload";

function App({ firebase }) {
  const [song, setSong] = useState({
    nombre: "",
    autor: "",
    duracion: "",
    compositor: "",
    year: "",
    foto: "",
  });
  const [songs, setSongs] = useState([]);
  const imageKey = v4();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSong((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const songsPeticion = async () => {
      await firebase.db
        .collection("Songs")
        .get()
        .then((canciones) => {
          canciones.forEach((cancion) => {
            setSongs((prev) => [...prev, cancion.data()]);
          });
        });
    };
    songsPeticion();
  }, []);

  const subirImagen = async (fotos) => {
    const foto = fotos[0];
    const nombreImagen = foto.name;
    const codigoUnico = v4();
    const extensionImagen = nombreImagen.split(".").pop();
    const alias = (
      nombreImagen.split(".")[0] +
      "_" +
      codigoUnico +
      "." +
      extensionImagen
    )
      .replace(/\s/g, "_")
      .toLowerCase();
    await firebase.guardarImagen(alias, foto).then((metadata) => {
      firebase.devolverImagenUrl(alias).then((urlImagen) => {
        setSong((prev) => ({
          ...prev,
          ["foto"]: urlImagen,
        }));
      });
    });
  };

  const subirSong = async (e) => {
    e.preventDefault();
    await firebase.db
      .collection("Songs")
      .doc()
      .set(song)
      .then((doc) => {
        console.log("Enviado!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <form>
        <div
          style={{ display: "flex", flexDirection: "column", width: "400px" }}
        >
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={song.nombre}
            onChange={handleChange}
          />
          <label htmlFor="autor">Autor</label>
          <input
            type="text"
            name="autor"
            value={song.autor}
            onChange={handleChange}
          />
          <label htmlFor="duracion">Duracion</label>
          <input
            type="text"
            name="duracion"
            value={song.duracion}
            onChange={handleChange}
          />
          <label htmlFor="compositor">Compositor</label>
          <input
            type="text"
            name="compositor"
            value={song.compositor}
            onChange={handleChange}
          />
          <label htmlFor="año">Año</label>
          <input
            type="text"
            name="year"
            value={song.year}
            onChange={handleChange}
          />
          <ImageUploader
            withIcon={false}
            key={imageKey}
            buttonText="Subir imagen..."
            singleImage={true}
            onChange={subirImagen}
            imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
            maxFileSize={5242880}
          />
          <button type="button" onClick={subirSong}>
            Enviar
          </button>
        </div>
      </form>
      {console.log(songs)}
    </div>
  );
}

export default consumerFirebase(App);
