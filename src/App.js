import "./App.css";
import { AuthContextProvider } from "./contexts/AuthContext";
import AppLayout from "./layouts/AppLayout";
import { Routes, Route } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import ForgortPassword from "./components/auth/ForgotPassword";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import VerifyEmail from "./components/auth/VerifyEmail";

import UserPage from "./pages/UserPage";
import UserDetails from "./components/users/UserDetails";
import UserEdit from "./components/users/UserEdit";
import UserList from "./components/users/UserList";

import CategoryPage from "./pages/CategoryPage";
import CategoryDetails from "./components/categories/CategoryDetails";
import CategoryEdit from "./components/categories/CategoryEdit";
import CategoryList from "./components/categories/CategoryList";

import ItemPage from "./pages/ItemPage";
import ItemDetails from "./components/items/ItemDetails";
import ItemEdit from "./components/items/ItemEdit";
import ItemList from "./components/items/ItemList";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/auth" element={<AuthPage />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forgotpass" element={<ForgortPassword />} />
          <Route path="checkemail" element={<VerifyEmail />} />
        </Route>
        <Route path="/" element={<AppLayout />}>
          {/* Users routes */}
          <Route path="users" element={<UserPage />}>
            <Route path=":id" element={<UserDetails />} />
            <Route path="edit" element={<UserEdit />} />
            <Route path="edit/:id" element={<UserEdit />} />
            <Route index element={<UserList />} />
          </Route>
          {/* Categories routes */}
          <Route path="categories" element={<CategoryPage />}>
            <Route path=":id" element={<CategoryDetails />} />
            <Route path="edit" element={<CategoryEdit />} />
            <Route path="edit/:id" element={<CategoryEdit />} />
            <Route index element={<CategoryList />} />
          </Route>
          {/* Items routes */}
          <Route path="items" element={<ItemPage />}>
            <Route path=":id" element={<ItemDetails />} />
            <Route path="edit" element={<ItemEdit />} />
            <Route path="edit/:id" element={<ItemEdit />} />
            <Route index element={<ItemList />} />
          </Route>
        </Route>
        {/* Users routes */}
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
