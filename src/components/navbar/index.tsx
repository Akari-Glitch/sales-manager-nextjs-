/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { StylesNavbar } from "../../styles/navbar/StylesNavbar"

function Navbar() {
  const router = useRouter()
  const [menu, setMenu] = useState(false);
  const showMenu = () => {
    setMenu(!menu)
    console.log(menu)
  };

  return (
    <StylesNavbar>
      <div className="contain">
        <h1 className="title">Isla Fea</h1>
        <div className="menu-logo-contain" onClick={showMenu}>
          <Image
            className="menu-logo"
            src="/menu-logo.png"
            width="25px"
            height="25px"
          ></Image>
        </div>
        <nav >
          <ul className={menu ? "show-menu menu" : "hidden-menu menu"}
            onClick={showMenu}>

            <li className="li-link" onClick={() => router.push("/home")}>
              <a>Inicio</a>
            </li>

            <li className="li-link" onClick={() => router.push("/inventory")}>
              <a>Inventario</a>
            </li>

            <li className="li-link" onClick={() => router.push("/sales")}> <a>Ventas</a> </li>

            <li className="li-link">
              <a>Más Opciones</a>
            </li>

          </ul>
        </nav>
      </div>
    </StylesNavbar>
  )
}

export default Navbar