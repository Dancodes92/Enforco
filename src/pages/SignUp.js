import React, { useState } from "react";
import { useSignUpMutation } from "../store/features/api/apiSlice";

function SignUp() {
  const [email, setEmail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const [addUser, { isLoading }] = useSignUpMutation();

  const onEmailInput = e => setEmail(e.target.value);
  const onFirstNameInput = e => setfirstName(e.target.value);
  const onLastNameInput = e => setLastName(e.target.value);
  const onPasswordInput = e => setPassword(e.target.value);

  const canSignUp =
    [email, firstName, lastName, password].every(Boolean) && !isLoading;

  const onSignUpButtonClicked = async () => {
    if (canSignUp) {
      try {
        await addUser({ email, firstName, lastName, password }).unwrap();
        setEmail("");
        setfirstName("");
        setLastName("");
        setPassword("");
      } catch (err) {
        console.error("Failed to Sign Up User: ", err);
      }
    }
  };

  return (
    <div className="flex-col">
      <h1>Sign up page</h1>
      <section className="text-sm justify-self-center align-middle px-16 border-l-cyan-600 m-9">
        <form>
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            name="email"
            placeholder="email"
            value={email}
            onChange={onEmailInput}
          />
          <label htmlFor="fName">First Name: </label>
          <input
            type="text"
            name="fName"
            value={firstName}
            onChange={onFirstNameInput}
          />
          <label htmlFor="lName">Last Name: </label>
          <input
            type="text"
            name="lName"
            value={lastName}
            onChange={onLastNameInput}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onPasswordInput}
          />
          <button
            type="button"
            onClick={onSignUpButtonClicked}
            disabled={!canSignUp}
          >
            Sign Up
          </button>
        </form>
      </section>
    </div>
  );
}

export default SignUp;
