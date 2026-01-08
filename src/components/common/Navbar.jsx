import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={{ background: "#2c3e50", color: "#fff", padding: "10px 20px" }}>
      <span><b>Student Academic Platform</b></span>
      {user && (
        <span style={{ float: "right" }}>
          {user.username} ({user.role}) |
          <button onClick={logout} style={{ marginLeft: "10px" }}>Logout</button>
        </span>
      )}
    </div>
  );
};

export default Navbar;
