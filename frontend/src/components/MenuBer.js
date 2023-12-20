import { Outlet, Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";

const MenuBer = () => {
  const [login, setLogin] = useState(null)

  // กดล๊อกเอ้าท์ให้ออกจากหน้านี้และลบ session
  const auth = async (event) => {
    axios.get('http://localhost:3001/logout')
      .then(res => {
        if (res.data) {
          setLogin(false)
          window.location.reload()
        }
        else alert('logout unsuccess!')
      })
      .catch(err => console.log(err))
  };

  // ถ้าล๊อกอินให้แสดงปุ่มล๊อกเอ้าท์
  axios.defaults.withCredentials = true
  useEffect(() => {
    axios.get('http://localhost:3001/read-session')
      .then(res => {
        if (res.data.state === 'admin') setLogin(true)
      }
      )
      .catch(err => console.log(err))
  }, [login])


  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dash-a">Dashboard</Link>
          </li>
          <li>
            <Link to="/prefer">Preferences</Link>
          </li>
          {login ?
            <li>
              <button type="button" onClick={auth}>Logout</button>
            </li>
            :
            <li>
              <Link to="/login">Login</Link>
            </li>
          }

        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default MenuBer;