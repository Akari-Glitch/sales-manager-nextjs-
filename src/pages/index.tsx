import { FormEvent, useState } from "react";
import Cookies from "universal-cookie";
import jwt from "jsonwebtoken"
import { useRouter } from "next/router";
import Image from "next/image";
import { StylesLogin } from "../styles/login/StylesLogin"

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
        router.push("/home")
      } else {
        setMessage(`Welcome ${username} and you are  no admin`)

      }
    } else {
      setMessage('something wrong')
    }
  }
  return (
    <StylesLogin>
      <div className="form-title">
        <Image className="img-huevo" width="210px" height="230px" src="/../public/img/huevo.jpg" alt="" />
        <h1><span className="title-symbol">¡</span>Bienvenido a <span className="text-admin">isla Fea</span> <span className="title-symbol">!</span></h1>
      </div>
      <form method="POST" onSubmit={handleSubmit} className="form-container">
        <div className="inputs-container">
          <div className="input-container">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} autoComplete="off" />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="off" />
          </div>
        </div>
        <div className='submit-container'>
          <input className="submit-button" type="submit" value="Login" />
        </div>
      </form>
    </StylesLogin>
  );
}
