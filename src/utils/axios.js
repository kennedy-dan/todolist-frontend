import axios from "axios";


const instance = axios.create({
	baseURL: "https://todolist-ifkq.onrender.com/api",
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
		Accept: "application/json",
	},
	crossDomain: true,
});




export default instance;
