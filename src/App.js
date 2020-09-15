import React, { useState } from "react";
import { consumerFirebase } from "./context/firebaseContext";

function App({ firebase }) {
  const [song, setSong] = useState({
    nombre: "",
    autor: "",
    duracion: "",
    compositor: "",
    year: "",
    foto: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSong((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          <button type="button" onClick={subirSong}>
            Enviar
          </button>
        </div>
      </form>
      {console.log(song)}
    </div>
  );
}

export default consumerFirebase(App);
