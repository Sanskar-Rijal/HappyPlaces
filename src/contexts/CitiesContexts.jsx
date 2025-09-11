import { createContext, useState, useEffect, useContext } from "react";

const CitiesContext = createContext();

const Base_Url = "http://localhost:8000/cities"; // Base URL for fetching cities data

function CitiesProvider({ children }) {
  //state for fetching cities from api
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  //fetching city data from api based on the id which was passed on the URL
  const [currentCity, setCurrentCity] = useState({});

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
        console.log("data", data);
        setLoading(false);
      } catch (error) {
        console.error("error", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);

  //now we create a function to fetch the current city based on the id
  async function getCityById(id) {
    try {
      setLoading(true);
      const response = await fetch(`${Base_Url}/${id}`);
      if (!response.ok) {
        throw new Error("Something went wrong, please try again later.....");
      }
      const data = await response.json();
      console.log("city data", data);
      setCurrentCity(data);
      setLoading(false);
    } catch (error) {
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  }

  //creating a new city when user click submit button on the form
  async function createCity(newCity) {
    try {
      setLoading(true);

      const response = await fetch(`${Base_Url}`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      //updating the cities states too
      setCities((cities) => [...cities, data]);

      setLoading(false);
    } catch {
      alert("there was an error loading data");
    } finally {
      setLoading(false);
    }
  }

  //async function for deleting a sity
  async function deleteCity(id) {
    try {
      setLoading(true);
      await fetch(`${Base_Url}/${id}`, {
        method: "DELETE",
      });
      //deleting cities from the state too
      setCities((cities) => cities.filter((city) => city.id !== id));
      setLoading(false);
    } catch {
      alert("There was a problem deleting the city");
    } finally {
      setLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading: loading,
        currentCity,
        getCityById,
        createCity,
        deleteCity,
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
