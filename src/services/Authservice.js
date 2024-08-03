import Api from '../axios/Api';
const USER_API="/user"
/*export const signup =async(user)=> {
    return await Api.post(USER_API + "/register",user);

}*/

export const signup = async (user) => {
    try {
      const response = await Api.post(USER_API+"/register", user); // Adjust API endpoint if needed
      
      // Log the entire response to understand its structure
      console.log("API response:", response);
      
      // Ensure response contains data
      if (response && response.data) {
        return response.data; // Return response.data if it's present
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      // Log or handle the error as necessary
      console.error("API error:", error.response ? error.response.data : error.message);
      throw error; // Ensure errors are propagated
    }
  };

/*export const signin=async(user)=> {
return await Api.post(USER_API+"/login", user);
}*/

export const signin = async (user) => {
    try {
      const response = await Api.post(USER_API+"/login", user); // Adjust API endpoint if needed
      
      // Log the entire response to understand its structure
      console.log("API response:", response);
      
      // Ensure response contains data
      if (response && response.data) {
        return response.data; // Return response.data if it's present
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      // Log or handle the error as necessary
      console.error("API error:", error.response ? error.response.data : error.message);
      throw error; // Ensure errors are propagated
    }
  };

export const fetchusers=async(users)=> {
    return await Api.get(USER_API+"/", users);
    }

 export const updateuserstatus=async({ id, isActive })=> {
        return await Api.put(USER_API+`"/status/${id}"`, { isActive });
        }