import axios from "axios";

// const BASEURL = import.meta.env.VITE_BASE_URL;
// const BASEURL = "/api";
const isDevelopment = import.meta.env.DEV;
const BASEURL = isDevelopment
  ? "/api"
  : "https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1";
const TOKEN = import.meta.env.VITE_API_KEY;
console.log("BASEURL", BASEURL);
console.log("TOKEN ", TOKEN);
const instance = axios.create({ baseURL: BASEURL });

// get all contacts
export const getContacts = async () => {
  try {
    let urlBackend =
      "/contacts?record_type=person&sort=created:desc&fields=first%20name,last%20name,email";

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
    throw error.response ? error.response.data : new Error("Unknown error");
  }
};
// get contact by id
export const getContactById = async (id) => {
  try {
    let urlBackend = `/contact/${id}?fields=first%20name,last%20name,email`;

    const { data } = await instance.get(urlBackend, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,

        "X-Requested-With": "XMLHttpRequest",
      },
    });

    return data.resources;
  } catch (error) {
    console.log("error", error.response.data);
    throw error.response ? error.response.data : new Error("Unknown error");
  }
};

//create contact
export const createContact = async (contactData) => {
  try {
    let urlBackend = `/contact`;
    const { data } = await instance.post(urlBackend, contactData, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,

        "X-Requested-With": "XMLHttpRequest",
      },
    });

    return data;
  } catch (error) {
    console.log("error", error);
    throw error.response ? error.response.data : new Error("Unknown error");
  }
};

//delete contact
export const deleteContact = async (contactId) => {
  try {
    let urlBackend = `/contact/${contactId}`;
    const { data } = await instance.delete(urlBackend, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,

        "X-Requested-With": "XMLHttpRequest",
      },
    });

    return data;
  } catch (error) {
    console.log("error", error);
    throw error.response ? error.response.data : new Error("Unknown error");
  }
};

// add teags

export const addTags = async (contactId, tagsArr) => {
  try {
    let urlBackend = `/contacts/${contactId}/tags`;
    const { data } = await instance.put(urlBackend, tagsArr, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,

        "X-Requested-With": "XMLHttpRequest",
      },
    });

    return data;
  } catch (error) {
    console.log("error", error);
    throw error.response ? error.response.data : new Error("Unknown error");
  }
};
