import { Route, BrowserRouter as Router, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Records from "./pages/Records";
import Main from "./pages/Main";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Home />} />
        <Route path="/records" element={<Records />} />
      </Routes>
    </Router>
  );
}
