import { axios } from "./ApiService";

export const GET_ALL_PUBLISHERS = async () => {
  try {
    const response = await axios.get("/publishers");
    return { error: false, data: response.data };
  } catch (err) {
    console.error(err);
    return { error: true, data: err };
  }
};

export const GET_PUBLISHER_BY_ID = async (id) => {
  try {
    const response = await axios.get(`/publishers/${id}`);
    return { error: false, data: response.data };
  } catch (err) {
    console.error(err);
    return { error: true, data: err };
  }
};

export const DELETE_PUBLISHER = async (id) => {
  try {
    const response = await axios.delete(`/publishers/${id}`);
    return { error: false, data: response.data };
  } catch (err) {
    console.error(err);
    return { error: true, data: err };
  }
};

export const SEARCH_PUBLISHER = async (text) => {
  try {
    const response = await axios.get(`/publishers/search?query=${text}`);
    return { error: false, data: response.data };
  } catch (err) {
    console.error(err);
    return { error: true, data: err };
  }
};

export const POST_NEW_PUBLISHER = async (newPublisher) => {
  try {
    const response = await axios.post(
      "/publishers/add-publisher",
      newPublisher
    );
    return { error: false, data: response.data };
  } catch (err) {
    console.error(err);
    return { error: true, data: err };
  }
};

export const EDIT_PUBLISHER = async (publisherId, updatedPublisher) => {
  try {
    const response = await axios.put(
      `/publishers/${publisherId}`,
      updatedPublisher
    );
    return { error: false, data: response.data };
  } catch (err) {
    console.error(err);
    return { error: true, data: err };
  }
};
