import React, { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Footer from "./Footer";

function LandingPage() {
  return (
    <div>
        <Login />
        <hr />
        <Signup />
        <hr />
        <Footer />
    </div>
  );
}

export default LandingPage;
