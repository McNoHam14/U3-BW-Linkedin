import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import "./assets/css/SinglePost.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navi from "./components/Navi";
import Footer from "./components/Footer";
import Feed from "./components/Pages/Feed.jsx";
import Profile from "./components/Pages/Profile";
import ChatWindow from "./components/ChatWindow";
import React from "react";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Navi />
      <main>
        <Container className="pl-0 pr-0">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Container>
        <ChatWindow />
        <Toaster position="top-right" />
      </main>
    </BrowserRouter>
  );
}

export default App;
