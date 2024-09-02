import { useState } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";

function App() {
  return (
    <div className="container">
      <Navigation />
      <HeroSection />
    </div>
  );
}

export default App;
