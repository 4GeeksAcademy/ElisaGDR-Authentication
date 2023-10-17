import React, { useContext } from "react";
import { Context } from "../store/appContext.js";


export const Protected = () => {
  const { store, actions } = useContext(Context);
  // const access = actions.protected();

  if (store.isLogin) {
    return <h1>Acceso Permitido</h1>
  } else {
    return (<h1>Página Privada, no tiene acceso</h1>)
  }
}