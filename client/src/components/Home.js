import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import PostContainer from "./PostContainer";

function Home() {

    return (
        <div className="container">
            <PostContainer />
        </div>
    );
};

export default Home;