import axios from "axios";

// const BASEURL = import.meta.env.VITE_BASE_URL;
const BASEURL = "/api";
const TOKEN = import.meta.env.VITE_API_KEY;

const instance = axios.create({ baseURL: BASEURL });

// get all contacts
export const getContacts = async () => {
  try {
    let urlBackend = "/contacts?record_type=person&sort=created:desc";

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
    let urlBackend = `/contact/${id}`;

    const { data } = await instance.get(urlBackend, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        // Origin: "http://localhost:5173",
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
        // Origin: "http://localhost:5173",
        "X-Requested-With": "XMLHttpRequest",
      },
    });

    return data;
  } catch (error) {
    console.log("error", error);
    throw error.response ? error.response.data : new Error("Unknown error");
  }
};

//DELETE https://live.devnimble.com/api/v1/contact/${contactId}
//delete contact
export const deleteContact = async (contactId) => {
  try {
    let urlBackend = `/contact/${contactId}`;
    const { data } = await instance.delete(urlBackend, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        // Origin: "http://localhost:5173",
        "X-Requested-With": "XMLHttpRequest",
      },
    });

    return data;
  } catch (error) {
    console.log("error", error);
    throw error.response ? error.response.data : new Error("Unknown error");
  }
};

// add teags https://live.devnimble.com/api/v1/contacts/66ae7f295290355bdf24eb36/tags

export const addTags = async (contactId, tagsArr) => {
  try {
    let urlBackend = `/contacts/${contactId}/tags`;
    const { data } = await instance.put(urlBackend, tagsArr, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        // Origin: "http://localhost:5173",
        "X-Requested-With": "XMLHttpRequest",
      },
    });

    return data;
  } catch (error) {
    console.log("error", error);
    throw error.response ? error.response.data : new Error("Unknown error");
  }
};
