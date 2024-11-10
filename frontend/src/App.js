import React, { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    const getDrugInfo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/drug/aspirin"
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching drug data:", error);
      }
    };

    getDrugInfo();
  }, []);

  return <div>Check the console for drug info.</div>;
}

export default App;
