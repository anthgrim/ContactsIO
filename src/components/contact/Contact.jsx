import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteContactAsync } from "../../features/Contacts";

import "./contactsList.css";
import {
  Avatar,
  Card,
  CardHeader,
  CardActions,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Confirmation from "../popUps/Confirmation";
import Update from "../popUps/Update";
import { toast } from "react-toastify";

const Contact = ({ id, name, email, phone }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const dispatch = useDispatch();
  const initials = name[0];

  const toggleDeletePopUp = () => {
    setIsDeleteOpen((prev) => !prev);
  };

  const toggleUpdate = () => {
    setIsUpdateOpen((prev) => !prev);
  };

  const contact = {
    id,
    name,
    email,
    phone,
  };

  const title = `${name} - ${id}`;

  const deleteContact = (id) => {
    dispatch(deleteContactAsync(id));
    toggleDeletePopUp();
    toast.success("Contact Deleted Successfully");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const cardStyles = {
    margin: "15px 10px",
    color: "white",
    background: "rgba(10, 47, 52, 0.25)",
    borderRadius: "8px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(8.4px)",
    WebkitBackdropFilter: "blur(8.4px)",
    border: "none",
  };

  return (
    <>
      <Card sx={{ width: 300 }} style={cardStyles}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#dee2e6", color: "#22333b" }}>
              {initials}
            </Avatar>
          }
          title={title}
          subheader={
            <div className="contact-info">
              <span>Email: {email}</span>
              <span>Phone: {phone}</span>
            </div>
          }
        />
        <CardActions>
          <IconButton onClick={toggleDeletePopUp}>
            <DeleteIcon style={{ color: "#ee6c4d" }} />
          </IconButton>
          <IconButton onClick={toggleUpdate}>
            <EditIcon style={{ color: "#74c69d" }} />
          </IconButton>
        </CardActions>
      </Card>
      {isDeleteOpen && (
        <Confirmation
          title="Delete Contact"
          text="Are you sure you want to delete this contact? All informaiton will be lost"
          cancelAction={toggleDeletePopUp}
          confirmAction={() => {
            deleteContact(id);
          }}
          isOpen={isDeleteOpen}
        />
      )}
      {isUpdateOpen && (
        <Update
          title="Delete Contact"
          contactData={contact}
          cancelAction={toggleUpdate}
          isOpen={isUpdateOpen}
        />
      )}
    </>
  );
};

export default Contact;
