import axios from "axios";

// const BASEURL = import.meta.env.VITE_BASE_URL;
const BASEURL = "/api";
const TOKEN = import.meta.env.VITE_API_KEY;

const instance = axios.create({ baseURL: BASEURL });

// get all contacts
export const getContacts = async () => {
  try {
    let urlBackend = "/contacts?record_type=person&sort=created:desc";
    console.log("token", TOKEN);
    const { data } = await instance.get(urlBackend, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        // Origin: "http://localhost:5173",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    console.log(data.resources);
    return data.resources;
  } catch (error) {
    console.log("error", error);
  }
};
// get all contacts
export const getContactById = async (id) => {
  try {
    let urlBackend = `/contact/${id}`;
    console.log("token", TOKEN);
    const { data } = await instance.get(urlBackend, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        // Origin: "http://localhost:5173",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    console.log(data.resources);
    return data.resources;
  } catch (error) {
    console.log("error", error);
  }
};
