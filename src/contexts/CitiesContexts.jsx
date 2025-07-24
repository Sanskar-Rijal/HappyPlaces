import { createContext, useState, useEffect, useContext } from "react";

const CitiesContext = createContext();

const Base_Url = "http://localhost:8000/cities"; // Base URL for fetching cities data

function CitiesProvider({ children }) {
  //state for fetching cities from api
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      //console.log("fetching cities");
      try {
        setLoading(true);
        const response = await fetch(`${Base_Url}`);
        if (!response.ok) {
          throw new Error("Something went wrong,please try again later.....");
        }
        const data = await response.json();
        setCities(data);
        //console.log("data", data);
        setLoading(false);
      } catch (error) {
        console.error("error", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading: loading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

//making custom hooks for using states
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}

export { CitiesProvider, useCities };
