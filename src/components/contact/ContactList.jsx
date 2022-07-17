import "./contactsList.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getContactsAsync } from "../../features/Contacts";

import Contact from "./Contact";

const ContactList = () => {
  const [height, setHeight] = useState(window.innerHeight - 64);
  const contacts = useSelector((state) => state.contact);
  const dispatch = useDispatch();

  //Loading contacts into state
  useEffect(() => {
    dispatch(getContactsAsync());
  }, []);

  window.addEventListener("resize", () => {
    setHeight(window.innerHeight - 64);
  });

  //Contact List
  let contactsList = [];
  if (contacts.value[0]) {
    contactsList = contacts.value[0].map((contact, index) => {
      return (
        <Contact
          key={index}
          id={contact.id}
          name={contact.name}
          email={contact.email}
          phone={contact.phone}
        />
      );
    });
  }
  return (
    <>
      <div className="contacts-container" style={{ height: `${height}px` }}>
        {contactsList}
      </div>
    </>
  );
};

export default ContactList;
