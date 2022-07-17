import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const GETCONTACTS_URL = "https://tester.crs-consulting.com/api/entries";
const GETONECONTACT_URL = " https://tester.crs-consulting.com/api/entry?id=";
const CONTACT_URL = "https://tester.crs-consulting.com/api/entry";

export const contactSlice = createSlice({
  name: "contacts",
  initialState: { value: [] },
  reducers: {
    getContacts: (state, action) => {
      state.value = [action.payload];
    },
    getOneContact: (state, action) => {},
    addContact: (state, action) => {
      state.value.push(action.payload);
    },
    updateContact: (state, action) => {},
  },
});

export const getContactsAsync = () => async (dispatch) => {
  try {
    const res = await axios.get(GETCONTACTS_URL);
    const sorted = res.data.sort((a, b) => b.id - a.id);
    dispatch(getContacts(sorted));
  } catch (error) {
    throw new Error(error);
  }
};

export const getOneContactAsync = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${GETONECONTACT_URL}${id}`);
    dispatch(getOneContact(res.data));
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const addContactAsync = (data) => async (dispatch) => {
  try {
    const res = await axios.post(CONTACT_URL, data);
    console.log(res.data);
    dispatch(addContact(res.data));
  } catch (error) {
    throw new Error(error);
  }
};

export const updateContactAsync = (data) => async (dispatch) => {
  try {
    const res = await axios.put(CONTACT_URL, data);
    console.log(res.data);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteContactAsync = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${GETONECONTACT_URL}${id}`);
    console.log(res.data);
  } catch (error) {
    throw new Error(error);
  }
};

export const { addContact, getContacts, getOneContact, updateContact } =
  contactSlice.actions;

export default contactSlice.reducer;
