import { FormEvent, useState } from "react";
import Cookies from "universal-cookie";
import jwt from "jsonwebtoken"
import { useRouter } from "next/router";


export default function Home() {
  const router = useRouter();
  const [message, setMessage] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch('api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }).then((t) => t.json())

    const token = res.token;

    if (token) {
      const json: any = jwt.decode(token)
      const { username, admin } = json;

      if (admin) {
        const cookies = new Cookies();
        if (cookies.get('logout') === 'true') cookies.remove('logout')
        cookies.set('loggin', 'true', { path: '/' });
        router.push("/sales")
      } else {
        setMessage(`Welcome ${username} and you are  no admin`)

      }
    } else {
      setMessage('something wrong')
    }
  }
  return (
    <>
      <h1>{message}</h1>
      <form method="POST" onSubmit={handleSubmit}>
        <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
        <br />
        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
        <input type="submit" value="login" />
      </form>
    </>
  );
}
