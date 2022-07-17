import "./form.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Box } from "@mui/material";

import { useDispatch } from "react-redux";
import { addContactAsync } from "../../features/Contacts";
import { toast } from "react-toastify";

const Form = () => {
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    name: yup.string("Enter contact name").required("Name is required"),
    email: yup
      .string("Enter the contact email address")
      .email("Enter a valid email")
      .required("Email address is required"),
    phone: yup
      .string("Enter contact phone number")
      .required("Phone number is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      createContact(values);
      formik.resetForm();
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    },
  });

  const createContact = (data) => {
    dispatch(addContactAsync(data));
    toast.success("Contact Added Successfully");
  };

  return (
    <div className="form-container">
      <h1>Add Contact</h1>
      <form onSubmit={formik.handleSubmit}>
        <Box m={2}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Box>

        <Box m={2}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Box>

        <Box m={2}>
          <TextField
            fullWidth
            id="phone"
            name="phone"
            label="Phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </Box>

        <Box m={2}>
          <button className="custom-btn" type="submit">
            Add Contact
          </button>
        </Box>
      </form>
    </div>
  );
};

export default Form;
