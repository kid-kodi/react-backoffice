import React from "react";
import { GET_CATEGORIES } from "../../constants/apiEndpoints";
import { FetchWrapper } from "../../helpers/apiRequest";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

const DeleteCategoryPage = () => {
  let navigate = useNavigate();
  const categoryId = useParams().id;
  const httpRequest = FetchWrapper();
  const deleteCategory = async (id) => {
    const response = await httpRequest.remove(`${GET_CATEGORIES}${categoryId}`);
    if (response) {
      navigate("/categories");
    }
  };

  return (
    <div>
      <p>Voulez-vous supprimer cette catégories?</p>
      <div>
        <button onClick={deleteCategory}>Supprimer</button>
        <Link to="/categories">Annuler</Link>
      </div>
    </div>
  );
};

export default DeleteCategoryPage;
