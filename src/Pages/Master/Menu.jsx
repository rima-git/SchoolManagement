// import { Routes, Route, Link } from "react-router-dom";

// import AddStu from "./AddStu";
// import GetStu from "./GetStu";
// import LogIn from "./LogIn";


// export default function Menu() {

//   return (
//     <>

//       {/* Menu */}

//       <div
//         style={{
//           background: "#0d6efd",
//           padding: "15px",
//           display: "flex",
//           gap: "20px"
//         }}
//       >

//         <Link
//           to="/"
//           style={{
//             color: "white",
//             textDecoration: "none"
//           }}
//         >
//           Login
//         </Link>

//         <Link
//           to="/addstu"
//           style={{
//             color: "white",
//             textDecoration: "none"
//           }}
//         >
//           Add Student
//         </Link>

//         <Link
//           to="/getstu"
//           style={{
//             color: "white",
//             textDecoration: "none"
//           }}
//         >
//           Get Student
//         </Link>

//       </div>

//       {/* Routes */}

//       <Routes>

//         <Route
//           path="/"
//           element={<LogIn />}
//         />

//         <Route
//           path="/addstu"
//           element={<AddStu />}
//         />

//         <Route
//           path="/getstu"
//           element={<GetStu />}
//         />

//       </Routes>

//     </>
//   );
// }




import { Routes, Route, Link } from "react-router-dom";

import AddStu from "./AddStu";
import GetStu from "./GetStu";
import LogIn from "./LogIn";
import { useEffect, useState } from "react";

export default function Menu() {
  const [token, setToken] = useState('')
  
  // useEffect(() => {
  //   const getToken = async () => {
  //     const tokaen = localStorage.getItem("token");
  //     console.log(tokaen);
  //     setToken(tokaen);
  //   };
  //   getToken();
  // }, []);


  return (
   <div
  style={{
    display: "flex",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    margin: 0,
    padding: 0
  }}
>

  {/* Side Menu */}
  <div
    style={{
      width: "240px",
      minWidth: "240px",
      background: "#1e293b",
      padding: "25px 15px",
      display: "flex",
      flexDirection: "column",
      boxShadow: "2px 0 10px rgba(0,0,0,0.1)"
    }}
  >

    {/* Logo */}
    <div
      style={{
        color: "white",
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "40px",
        textAlign: "center",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
        paddingBottom: "15px"
      }}
    >
      Student App
    </div>

    {/* Menu */}
    <Link to="/addstu" style={menuStyle}>
      Add Student
    </Link>

    <Link to="/getstu" style={menuStyle}>
      Get Student
    </Link>

  </div>


  {/* Right Side */}
  <div
    style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      background: "#f1f5f9",
      width: "100%"
    }}
  >

    {/* Top Bar */}
    <div
      style={{
        height: "70px",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 25px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        flexShrink: 0
      }}
    >

      {/* Title */}
      <h4
        style={{
          margin: 0,
          fontWeight: "600",
          color: "#1e293b"
        }}
      >
        Dashboard
      </h4>

      {/* Logout Button */}
      <button
        onClick={() => {

          localStorage.removeItem("token");
          localStorage.removeItem("expiryTime");

          window.location.href = "/";

        }}
        style={{
          background: "#ef4444",
          color: "white",
          border: "none",
          padding: "10px 18px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        Logout
      </button>

    </div>


    {/* Page Content */}
    <div
      style={{
        flex: 1,
        padding: "20px",
        overflowY: "auto",
        overflowX: "hidden",
        width: "100%"
      }}
    >

      <Routes>

        <Route
          path="/"
          element={<LogIn />}
        />

        <Route
          path="/addstu"
          element={<AddStu />}
        />

        <Route
          path="/getstu"
          element={<GetStu />}
        />

      </Routes>

    </div>

  </div>

</div>
  );
}
const menuStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "17px",
  padding: "14px 18px",
  borderRadius: "10px",
  marginBottom: "10px",
  transition: "0.3s",
  background: "rgba(255,255,255,0.08)"
};