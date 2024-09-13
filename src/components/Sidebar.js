import React from "react";
import "../styles/sidebar.css";

const Sidebar = () => {
  return (
    <div className="menu">
      <div className="logo">
        <p>Menu</p>
      </div>
      <div className="menu-list">
        <a href="#" className="item">
          소개
        </a>
        <a href="#" className="item">
          활동
        </a>
        <a href="#" className="item">
          굿즈
        </a>
        <a href="#" className="item">
          파일
        </a>
        <a href="#" className="item">
          QnA
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
