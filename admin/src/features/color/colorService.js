import axios from "axios";
import { baseURL } from "../../utils/baseURL";
import { config } from "../../utils/axiosConfig";


const getColors = async () => {
    const response = await axios.get(`${baseURL}color/`);
    return response.data;
}

const createColor = async (color) => {
    const response = await axios.post(`${baseURL}color/`, color, config);
    return response.data;
};

const getColor = async (id) => {
    const response = await axios.get(`${baseURL}color/${id}`, config);
    return response.data;
};

const updateColor = async (color) => {
    const response = await axios.put(`${baseURL}color/${color.id}`, { title: color.colorData.title }, config);
    return response.data;
};

const deleteColor = async (id) => {
    const response = await axios.delete(`${baseURL}color/${id}`, config);
    return response.data;
};


const colorService = {
    getColors,
    getColor,
    createColor,
    updateColor,
    deleteColor
}


export default colorService;
