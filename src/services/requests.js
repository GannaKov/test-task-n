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

//DELETE https://live.devnimble.com/api/v1/contact/${contactId}
//delete contact
export const deleteContact = async (contactId) => {
  try {
    console.log("contactId in req", contactId);
    let urlBackend = `/contact/${contactId}`;
    const { data } = await instance.delete(urlBackend, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        // Origin: "http://localhost:5173",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    console.log("data delete", data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// add teags https://live.devnimble.com/api/v1/contacts/66ae7f295290355bdf24eb36/tags

export const addTags = async (contactId, tagsArr) => {
  console.log("tagsArr", tagsArr);
  try {
    let urlBackend = `/contacts/${contactId}/tags`;
    const { data } = await instance.put(urlBackend, tagsArr, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        // Origin: "http://localhost:5173",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    console.log("tags data", data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
