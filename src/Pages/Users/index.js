import React from "react";
import { Link, Navigate } from "react-router-dom";
import { api } from "../../services/api";

export default function User() {
  const teste = async () => {
    const response = await api.get("/user");
    console.log(response);
  };
  return (
    <>
      <h1>User</h1>
      <Link to="/eventos/listar">Eventos</Link>
      <button onClick={teste}>TESTE</button>
    </>
  );
}
