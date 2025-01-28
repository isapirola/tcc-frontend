import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, Login, Register } from "./pages";
import { UserProvider } from "./context/UserContext";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      <Analytics />
    </UserProvider>
  );
}

export default App;
