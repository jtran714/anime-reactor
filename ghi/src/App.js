import React from "react";
import { BrowserRouter } from "react-router-dom";
import Nav from "./Nav";
import SignupForm from "./SignupForm";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <SignupForm />
    </BrowserRouter>
  );
}

export default App;