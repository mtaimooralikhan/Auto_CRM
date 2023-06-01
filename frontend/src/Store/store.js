import { configureStore } from "@reduxjs/toolkit";
import  loginReducer  from './userSlice';
import  signUpReducer  from './signUpSlice';
import  tableReducer  from './tableSlice';
import categoryReducer from "./categorySlice";
import categoryByIdReducer from "./categoryByIdSlice";
import carByIdReducer from "./carByIdSlice";
import createCategoryReducer from "./createCategorySlice";
import createCarReducer from "./createCarSlice";
import updateCategoryReducer from "./updateCategorySlice";
import updateCarReducer from "./updateCarSlice";
import deleteCategoryReducer from "./deleteCategorySlice";
import deleteCarReducer from "./deleteCarSlice";


export const store = configureStore({
  reducer: {
    login: loginReducer,
    signUp: signUpReducer,
    table: tableReducer,
    category: categoryReducer,
    categoryById: categoryByIdReducer,
    category: createCategoryReducer,
    car: createCarReducer,
    carById: carByIdReducer,
    update: updateCategoryReducer,
    updateCar: updateCarReducer,
    delete: deleteCategoryReducer,
    delete: deleteCarReducer,
  }
});
