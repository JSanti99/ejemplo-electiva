import React, { createContext } from "react";

const FirebaseContext = createContext();

export default FirebaseContext;
export const consumerFirebase = (Component) => (props) => {
  return (
    <FirebaseContext.Consumer>
      {(firebase) => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
  );
};
