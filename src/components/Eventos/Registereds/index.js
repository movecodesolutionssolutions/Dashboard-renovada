import React from "react";
import styled from "styled-components";

const UserListContainer = styled.div`
  margin-top: 20px;
`;

const UserItem = styled.div`
  margin-bottom: 8px;
  font-size: 14px;
`;

const Registereds = ({ users }) => {
  if (!users || users.length === 0) {
    // If users is undefined or an empty array, you can return a message or null
    return (
      <UserListContainer>
        {" "}
        <h3>Usuários Cadastrados:</h3>
        Nenhuma Inscrição
      </UserListContainer>
    );
  }

  return (
    <UserListContainer>
      <h3>Usuários Cadastrados:</h3>
      {users.map((user, index) => (
        <UserItem key={index}>{user.name}</UserItem>
      ))}
    </UserListContainer>
  );
};

export default Registereds;
