import { createContext, useContext, useReducer } from "react";

const FAKE_USER = {
  name: "April",
  email: "april@gmail.com",
  password: "君がいないと本当に退屈だね",
  avatar: "https://i.imgur.com/WTFTkMh.jpeg",
};

const AuthContext = createContext();

//initial state for auth context
const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("no matching action type", action.type);
  }
}

function AuthProvider({ children }) {
  //using useReducer hook to manage the state
  const [state, dispatch] = useReducer(reducer, initialState);

  const { user, isAuthenticated } = state;

  function login(email, password) {
    //fake login function
    console.log("Logging in", { email, password });
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

//now we make custom hooks to use this auth
function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
