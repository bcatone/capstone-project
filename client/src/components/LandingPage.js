import React, { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";

function LandingPage() {
  return (
    <div>
        <Login />
        <hr />
        <Signup />
    </div>
  );
}

export default LandingPage;
