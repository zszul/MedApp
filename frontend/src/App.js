import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [drugInfo, setDrugInfo] = useState([]);
  const [homePage, setHomePage] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [notFound, setNotFound] = useState(false); // State for not found message

  const getDrugInfo = async (drugName) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/drug/${drugName}`
      );
      if (response.data && response.data.length > 0) {
        setDrugInfo(response.data);
        setNotFound(false); // Reset not found message if data is available
      } else {
        setDrugInfo([]);
        setNotFound(true); // Set not found message if no data is returned
      }
    } catch (error) {
      console.error("Error fetching drug data:", error);
      setDrugInfo([]);
      setNotFound(true); // Set not found message on error
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getDrugInfo(searchTerm);
    setHomePage(false);
  };

  if (homePage) {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter drug name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      {notFound ? (
        <div>Sorry, we couldn't find any information for "{searchTerm}".</div>
      ) : (
        <>
          <div>Active Ingredient: {drugInfo[0]?.active_ingredient}</div>
          <div>Purpose: {drugInfo[1]?.purpose}</div>
          <div>Indications and Usage: {drugInfo[2]?.indications_and_usage}</div>
          <div>Warnings: {drugInfo[3]?.warnings}</div>
          <div>Do Not Use: {drugInfo[4]?.do_not_use}</div>
          <div>Ask Doctor: {drugInfo[5]?.ask_doctor}</div>
          <div>Stop Use: {drugInfo[6]?.stop_use}</div>
          <div>
            Dosage and Administration: {drugInfo[7]?.dosage_and_administration}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
