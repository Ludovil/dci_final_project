import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Container from "./context/Container.jsx";
import "./index.css";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER;

ReactDOM.createRoot(document.getElementById("root")).render(
  <Container>
    <App />
  </Container>
);
