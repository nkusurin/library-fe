import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <nav
      className="py-2 px-4 bg-blue-500 text-white"
      style={{ marginBottom: "2%" }}
    >
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          justifyContent: "center",
          padding: "0",
        }}
      >
        <li style={{ margin: "0 10px" }}>
          <Link
            to="/"
            style={{ color: "white", textDecoration: "none" }}
            onMouseOver={(e) =>
              (e.target.style.textShadow = "2px 2px 2px rgba(0, 0, 0, 0.5)")
            }
            onMouseOut={(e) => (e.target.style.textShadow = "")}
          >
            Početna
          </Link>
        </li>
        <li style={{ margin: "0 10px" }}>
          <Link
            to="/books"
            style={{ color: "white", textDecoration: "none" }}
            onMouseOver={(e) =>
              (e.target.style.textShadow = "2px 2px 2px rgba(0, 0, 0, 0.5)")
            }
            onMouseOut={(e) => (e.target.style.textShadow = "")}
          >
            Knjige
          </Link>
        </li>
        <li style={{ margin: "0 10px" }}>
          <Link
            to="/publishers"
            style={{ color: "white", textDecoration: "none" }}
            onMouseOver={(e) =>
              (e.target.style.textShadow = "2px 2px 2px rgba(0, 0, 0, 0.5)")
            }
            onMouseOut={(e) => (e.target.style.textShadow = "")}
          >
            Nakladnici
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
