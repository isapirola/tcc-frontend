import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, Login, Register } from "./pages";
import { UserProvider } from "./context/UserContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
      <SpeedInsights />
    </UserProvider>
  );
}

export default App;
