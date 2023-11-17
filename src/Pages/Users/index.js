import React from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

const User = () => {
  const teste = async () => {
    const response = await api.get("/user");
    console.log(response);
  };
  return (
    <>
      <h1>User</h1>
      <Link to="/events/list">Eventos</Link>
      <button onClick={teste}>TESTE</button>
    </>
  );
};
export default User;