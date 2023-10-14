import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const Login = () => {
    const {store, actions} = useContext(Context);
    const handleLogin = (event) => {
        event.preventDefault();
        console.log("function handleLogin");
        actions.login("test", "test");
    } 

    return (
        <form onSubmit={handleLogin}>
            <button type="submit">Click me!</button>
        </form>
    )
}
