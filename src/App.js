import "./App.css";
import Navbar from "./components/navbar/Navbar";
import ContactList from "./components/contact/ContactList";
import Form from "./components/form/Form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormSearch from "./components/form/FormSearch";

function App() {
  return (
    <>
      <Navbar />
      <div className="App">
        <ContactList />
        <div className="forms">
          <Form />
          <FormSearch />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
