import React from "react";
import Hero from "../hero/Hero.js";

const Home = ({movies}) => {
    return (
        // <div>
        //     God is Great. Jesus I trust in You.
        // </div>
        <Hero movies={movies} />
    )
}

export default Home;