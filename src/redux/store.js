import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from "../features/articleslice"
import cartSliceReducer from "../features/cartSlice"
import scategoriesReducer from "../features/scategorieSlice"
import categoriesReducer from "../features/categorieslice"
import authReducer from "../features/AuthSlice"
import ordersReducer from '../features/ordersSlice';


const store = configureStore({
reducer: {
storearticles:articlesReducer,
storecart:cartSliceReducer,
storescategories: scategoriesReducer,
storecategories: categoriesReducer,
auth:authReducer, 
orders: ordersReducer

}
})
export default store