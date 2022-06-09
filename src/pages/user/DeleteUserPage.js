import React from "react";
import { GET_USERS } from "../../constants/apiEndpoints";
import { FetchWrapper } from "../../helpers/apiRequest";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

const DeleteUserPage = () => {
  let navigate = useNavigate();
  const userId = useParams().id;
  const httpRequest = FetchWrapper();
  const deleteUser = async (id) => {
    const response = await httpRequest.remove(`${GET_USERS}${userId}`);
    if (response) {
      navigate("/users");
    }
  };

  return (
    <div>
      <p>Voulez-vous supprimer cet utilisateur?</p>
      <div>
        <button onClick={deleteUser}>Supprimer</button>
        <Link to="/users">Annuler</Link>
      </div>
    </div>
  );
};

export default DeleteUserPage;
