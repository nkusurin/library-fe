import { axios } from "./ApiService";

export const GET_LOANS_FOR_BOOK_BY_ID = async (id) => {
  try {
    const response = await axios.get(`/loans/${id}`);
    console.log("LOANSI > ", response.data);
    return { error: false, data: response.data };
  } catch (err) {
    console.error(err);
    return { error: true, data: err };
  }
};

export const POST_NEW_LOAN = async (newLoan) => {
  try {
    const response = await axios.post("/loans/add-loan", newLoan);
    return { error: false, data: response.data };
  } catch (err) {
    console.error(err);
    return { error: true, data: err };
  }
};

export const EDIT_LOAN = async (loanId, updatedLoan) => {
  try {
    const response = await axios.put(`/loans/${loanId}`, updatedLoan);
    return { error: false, data: response.data };
  } catch (err) {
    console.error(err);
    return { error: true, data: err };
  }
};

export const GET_LOAN_BY_ID = async (id) => {
  try {
    const response = await axios.get(`/loans/get-loan/${id}`);
    return { error: false, data: response.data };
  } catch (err) {
    console.error(err);
    return { error: true, data: err };
  }
};

export const EDIT_LOAN_BY_ID = async (loanId, updatedLoan) => {
  try {
    const response = await axios.put(`/loans/edit-loan/${loanId}`, updatedLoan);
    return { error: false, data: response.data };
  } catch (err) {
    console.error(err);
    return { error: true, data: err };
  }
};
