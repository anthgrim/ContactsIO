import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Box } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { updateContactAsync } from "../../features/Contacts";
import { toast } from "react-toastify";

const Confirmation = ({ title, contactData, cancelAction, isOpen }) => {
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

  const updateContact = (data) => {
    dispatch(updateContactAsync(data));
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const formik = useFormik({
    initialValues: {
      id: contactData.id,
      name: contactData.name,
      email: contactData.email,
      phone: contactData.phone,
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateContact(values);
      toast.success("Contact updated");
      cancelAction();
    },
  });

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={cancelAction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
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
                Update Contact
              </button>
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelAction}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Confirmation;
