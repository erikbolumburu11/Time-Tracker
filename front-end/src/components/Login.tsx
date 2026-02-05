'use client'
import { useState, FormEvent, ChangeEvent } from "react";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    await login(username, password);
  }

  function handleUsernameChange(e: ChangeEvent<HTMLInputElement>): void {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="username"
        value={username}
        onChange={handleUsernameChange}
        required
      />

      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        required
      />

      <button type="submit">Login</button>
    </form>
  );
}