import app from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZFIwGiya4s3nzSUX_Zw-ahtEg1WYUgak",
  authDomain: "electiva-ejemplo.firebaseapp.com",
  databaseURL: "https://electiva-ejemplo.firebaseio.com",
  projectId: "electiva-ejemplo",
  storageBucket: "electiva-ejemplo.appspot.com",
  messagingSenderId: "27464923537",
  appId: "1:27464923537:web:8999afa1bdbeb9900cc230",
  measurementId: "G-Y56PZJ04YW",
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.db = app.firestore();
    this.storage = app.storage();
  }

  guardarImagen = (nombreImagen, imagen) =>
    this.storage.ref().child(nombreImagen).put(imagen);
  devolverImagenUrl = (nombreImagen) =>
    this.storage.ref().child(nombreImagen).getDownloadURL();
}

export default Firebase;
