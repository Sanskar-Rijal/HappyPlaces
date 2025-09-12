import { createContext, useEffect, useContext, useReducer } from "react";

const CitiesContext = createContext();

const Base_Url = "http://localhost:8000/cities"; // Base URL for fetching cities data

//managing state by using useReducer hook

//first we create an initial state
const initialState = {
  cities: [],
  loading: false,
  currentCity: {},
  error: "",
};

//secondly we create a reducer function
function reducer(state, action) {
  //state is the current State and action is something that we pass to dispatch function

  switch (action.type) {
    case "loading":
      return { ...state, loading: true };

    case "cities/loaded":
      return { ...state, cities: action.payload, loading: false };

    case "city/loaded/byid":
      return { ...state, currentCity: action.payload, loading: false };

    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        loading: false,
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        loading: false,
        currentCity: {},
      };

    case "rejected":
      return { ...state, loading: false, error: action.payload };

    default:
      throw new Error("no matching action type", action.type);
  }
}

function CitiesProvider({ children }) {
  // //state for fetching cities from api
  // const [cities, setCities] = useState([]);
  // const [loading, setLoading] = useState(false);

  // //fetching city data from api based on the id which was passed on the URL
  // const [currentCity, setCurrentCity] = useState({});

  //now implemnting useReducer hook
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, loading, currentCity, error } = state;

  useEffect(function () {
    async function fetchCities() {
      //console.log("fetching cities");
      dispatch({ type: "loading" });
      try {
        const response = await fetch(`${Base_Url}`);
        if (!response.ok) {
          throw new Error("Something went wrong,please try again later.....");
        }
        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "rejected", payload: error.message });
      }
    }
    fetchCities();
  }, []);

  //now we create a function to fetch the current city based on the id
  async function getCityById(id) {
    //if user is loading the same city then we don't have to fetch again right?
    //we are getting id from the url , anything we get from url is a strirng
    //so we have to convert it into a number
    if (Number(id) === currentCity.id) return;

    try {
      dispatch({ type: "loading" });
      const response = await fetch(`${Base_Url}/${id}`);
      if (!response.ok) {
        throw new Error("Something went wrong, please try again later.....");
      }
      const data = await response.json();

      dispatch({ type: "city/loaded/byid", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  //creating a new city when user click submit button on the form
  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });

      const response = await fetch(`${Base_Url}`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      //updating the cities states too
      dispatch({ type: "city/created", payload: data });
    } catch {
      alert("there was an error creating city");
      dispatch({
        type: "rejected",
        payload: "there was an error creating city",
      });
    }
  }

  //async function for deleting a sity
  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });

      await fetch(`${Base_Url}/${id}`, {
        method: "DELETE",
      });
      //deleting cities from the state too
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      alert("There was a problem deleting the city");
      dispatch({
        type: "rejected",
        payload: "There was a problem deleting the city",
      });
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
        error,
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
