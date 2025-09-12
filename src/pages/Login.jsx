import styles from "./Login.module.css";
import React, { useEffect } from "react";
import PageNav from "../components/PageNav/PageNav";
import { useAuth } from "../contexts/FakeAuthContext";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = React.useState("april@gmail.com");
  const [password, setPassword] = React.useState("君がいないと本当に退屈だね");

  // using context api of fakeauth
  const { login, isAuthenticated } = useAuth();

  //using useNav hook to navigate
  const navigate = useNavigate();

  //handling submit
  function handleSubmit(event) {
    event.preventDefault();
    if (!email || !password) return alert("Please enter email and password");
    login(email, password);
  }

  //now checking whether user is authenticated or not (i mean if lofin(email,passsord) runs successfully
  //then isAuthenticated will become trueee)
  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
