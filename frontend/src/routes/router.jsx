
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import CreateCar from "../components/car/CreateCar";
import ListCars from "../components/car/ListCars";
import Category from "../components/category/Category";
import CreateCategory from "../components/category/CreateCategory";
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import EditCategory from "../components/category/EditCategory";
import EditCar from "../components/car/EditCar";

function AppRouter() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route path="/create-car" element={<CreateCar />} />
      <Route exact path="/list-car" element={<ListCars />} />
      <Route path="/car/category" element={<Category />} />
      <Route path="/car/create-category" element={<CreateCategory />} />
      <Route path="/car/create-car" element={<CreateCar />} />
      <Route path="/car/update-category" element={<EditCategory />} />
      <Route path="/car/update-category/:id" element={<EditCategory />} />
      <Route path="/car/update-car" element={<EditCar />} />
      <Route path="/car/update-car/:id" element={<EditCar />} />
    </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
