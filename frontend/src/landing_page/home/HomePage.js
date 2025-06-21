import React from 'react';
import Hero from "./Hero";
import Awards from './Awards';
import Pricing from './Pricing';
import Education from './Education';
import OpenAccount from '../OpenAccount';
import NavBar from '../Navbar';
import Footer from '../Footer';
import Stats from './Stats';

function HomePage() {
    return (
        <>
            <Hero/>
            <Awards/>
            <Stats/>
            <Pricing/>
            <Education/>
            <OpenAccount/>
        </>
);
}

export default HomePage;