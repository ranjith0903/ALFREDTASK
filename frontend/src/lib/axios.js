import axios from "axios";


const axiosInstance = axios.create({
	
	baseURL: import.meta.mode==="development"?"https://alfredtask-w8am.onrender.com//api":"/api",
	withCredentials: true, // send cookies to the server
});


export default axiosInstance;
