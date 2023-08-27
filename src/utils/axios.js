import axios from "axios";


const instance = axios.create({
	baseURL: "http://localhost:3001/api",
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
		Accept: "application/json",
	},
	crossDomain: true,
});




export default instance;
