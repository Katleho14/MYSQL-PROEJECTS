import React, { createContext, useState } from "react";

const Context = createContext();

const Provider = (props) => {
  const host = "https://mysql-proejects.onrender.com";

  return (
    <Context.Provider value={{ host }}>
      {props.children}
    </Context.Provider>
  );
};

export { Context, Provider };