import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {signup,signin, fetchusers} from "../services/Authservice";
import Api from '../axios/Api';
import axios from "axios";


/*export const register = createAsyncThunk(
"auth/register",
async (user, thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try{
const res= await signup(user);
return res.data
}
catch (error) {
  
return rejectWithValue(error.message);
}});*/

export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      const data = await signup(user);
      return data;
    } catch (error) {
      console.error("Error in register thunk:", error.response ? error.response.data : error.message);
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);


/*export const login = createAsyncThunk(
"auth/login",
async (user, thunkAPI) => {
try {
const res = await signin(user);
return res.data ;
} catch (error) {
  console.log("Error login:", error);
  // Adjust to handle various error structures
  const errorMessage = error.response?.data?.message || error.message ;
  return thunkAPI.rejectWithValue(errorMessage);
}});*/

export const login = createAsyncThunk(
  'auth/login',
  async (user, thunkAPI) => {
    try {
      const data = await signin(user);
      return data;
    } catch (error) {
      console.error("Error in login thunk:", error.response ? error.response.data : error.message);
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);



export const logout = createAsyncThunk("auth/logout", () => {
localStorage.removeItem("CC_Token");
});

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (users, thunkAPI) => {
    const response = await fetchusers(users) ;
    return response.data;
  });

  export const updateUserStatus = createAsyncThunk('users/updateUserStatus', async ({ id, isActive }) => {
    const response = await axios.put(`https://backend-node-express-mongoose-stripe-jwt.onrender.com/api/user/status/${id}`, { isActive });
    return response.data;
});
  
export const updateUserRole = createAsyncThunk('users/updateUserRole', async ({ id, role }) => {
    const response = await axios.put(`https://backend-node-express-mongoose-stripe-jwt.onrender.com/api/user/role/${id}`, { role });
    return response.data;
  });

  export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async (_, thunkAPI) => {
    try {
      const response = await axios.get('https://backend-node-express-mongoose-stripe-jwt.onrender.com/api/user/current-user');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });
  


  // Function to refresh the access token



export const authSlice = createSlice({
name: "auth",
initialState: {
users: [],

 
user:null,
isLoading: false,
isSuccess: false,
isError: false,
errorMessage: null,
isLoggedIn:false,
},
reducers: {
    // Reducer comes here
    reset:(state)=>{
    state.isLoading=false
    state.isSuccess=false
    state.isError=false
    state.errorMessage=null
    state.isLoggedIn=false
    }
    },
    extraReducers: (builder) => {
    //get articles
    builder
    //insertion user
    .addCase(register.pending, (state, action) => {
    state.isLoading=true;
    state.status=null;
    })
    .addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
      state.errorMessage = '';
      state.isError = ''; // Clear any previous error messages
    })
    .addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.user = null;
      state.errorMessage = action.payload; // Update with the actual error message
    })
    .addCase(login.pending, (state, action) => {
    state.isLoading=true;
    state.status=null;
    })
    .addCase(login.fulfilled, (state, action) => {
    state.isLoggedIn = true;
    state.isSuccess= true;
    console.log(action.payload);
    state.user = action.payload.user;
    localStorage.setItem("CC_Token",action.payload.token);
    console.log( localStorage.getItem("CC_Token"))
    localStorage.setItem('refresh_token', action.payload.refreshToken);
    
    })
    .addCase(login.rejected, (state, action) => {
    state.isLoggedIn = false;
    state.user = null;
    console.log("error rejected", action.payload)

    state.isError = action.payload
    })
    .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
        })
        
          .addCase(fetchUsers.fulfilled, (state, action) => {
            
            state.users = action.payload;
          })
         
          .addCase(updateUserStatus.fulfilled, (state, action) => {
            const index = state.users.findIndex(user => user._id === action.payload._id);
            if (index !== -1) {
              state.users[index].isActive = action.payload.isActive;
            }
          })
          .addCase(updateUserRole.fulfilled, (state, action) => {
            const index = state.users.findIndex(user => user._id === action.payload._id);
            if (index !== -1) {
              state.users[index].role = action.payload.role;
            }
          })
          .addCase(fetchCurrentUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
          })
          .addCase(fetchCurrentUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload;
          })
        }}
        )

       
          
        export const {reset} =authSlice.actions
        export default authSlice.reducer;
       
