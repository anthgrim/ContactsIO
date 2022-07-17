import "./form.css";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { TextField, Box } from "@mui/material";
import Contact from "../contact/Contact";
import { toast } from "react-toastify";

import axios from "axios";

const GETONECONTACT_URL = " https://tester.crs-consulting.com/api/entry?id=";
const FormSearch = () => {
  const [targetContact, setTargetContact] = useState();
  const validationSchema = yup.object({
    id: yup
      .string("Please enter the id you are looking for")
      .required("Id is required"),
  });

  const formik = useFormik({
    initialValues: {
      id: "",
    },

    validationSchema: validationSchema,

    onSubmit: async (values) => {
      try {
        const response = await axios.get(
          `${GETONECONTACT_URL}${parseInt(values.id)}`
        );
        if (response.status === 200) {
          setTargetContact(response.data);
        } else {
          toast.error("Contact was not found");
        }
        return;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="form-container">
      <h1>Search Contact</h1>
      <form onSubmit={formik.handleSubmit}>
        <Box m={2}>
          <TextField
            fullWidth
            id="id"
            name="id"
            label="id"
            value={formik.values.id}
            onChange={formik.handleChange}
            error={formik.touched.id && Boolean(formik.errors.id)}
            helperText={formik.touched.id && formik.errors.id}
          />
        </Box>
        <Box m={2}>
          <button className="custom-btn" type="submit">
            Search By Id
          </button>
        </Box>
      </form>
      {targetContact && (
        <Contact
          id={targetContact.id}
          name={targetContact.name}
          email={targetContact.email}
          phone={targetContact.phone}
        />
      )}
    </div>
  );
};

export default FormSearch;
