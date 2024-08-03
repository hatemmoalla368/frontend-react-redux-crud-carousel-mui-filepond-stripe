import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCategories } from '../services/categorieservice'; 
export const getcategories = createAsyncThunk(
"categorie/getcategories",
async (_, thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try {
const res = await fetchCategories();
return res.data;
}
catch (error) {
return rejectWithValue(error.message);
}
}
);




export const categorieslice = createSlice({
name: 'categorie',
initialState:{
categories:[],
categorie:{},
isLoading: false,
success:null,
error:null,
},

extraReducers: (builder) => {
//get scategories
builder
.addCase(getcategories.pending, (state, action) => {
state.isLoading=true;
state.error=null;
})
.addCase(getcategories.fulfilled, (state, action) => {
state.isLoading=false;
state.error = null;
state.categories=action.payload;
})
.addCase(getcategories.rejected, (state, action) => {
state.isLoading=false;
state.error=action.payload;
console.log("impossible de se connecter au serveur")
})






}
}
)

export default categorieslice.reducer;