import { axios } from "./ApiService";

export const GET_ALL_GENRES = async () => {
  try {
    const response = await axios.get("/genres");
    return { error: false, data: response.data };
  } catch (err) {
    console.error(err);
    return { error: true, data: err };
  }
};
