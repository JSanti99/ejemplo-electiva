import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
//Firebase
import FirebaseContext from "./context/firebaseContext";
import Firebase from "./firebase/Firebase";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
