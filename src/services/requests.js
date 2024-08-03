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

    return data.resources;
  } catch (error) {
    console.log("error", error);
  }
};
// get contact by id
export const getContactById = async (id) => {
  try {
    let urlBackend = `/contact/${id}`;

    const { data } = await instance.get(urlBackend, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        // Origin: "http://localhost:5173",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    console.log("data", data.resources);
    return data.resources;
  } catch (error) {
    console.log("error", error);
  }
};

//create contact
export const createContact = async (contactData) => {
  console.log("contactData", contactData);
  try {
    let urlBackend = `/contact`;
    const { data } = await instance.post(urlBackend, contactData, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        // Origin: "http://localhost:5173",
        "X-Requested-With": "XMLHttpRequest",
      },
    });

    return data;
  } catch (error) {
    console.log("error", error);
  }
};
