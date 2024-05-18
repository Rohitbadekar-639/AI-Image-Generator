import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api/",
});

export const GetPosts = async () => await API.get("/post/");
export const CreatePosts = async (data) => await API.post("/post/", data);
export const GenerateAIImage = async (data) => await API.get("/generateImage/", data);