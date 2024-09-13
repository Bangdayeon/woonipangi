import "./App.css";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import img_logo from "./img/logo1.svg";

function App() {
  let webTitle = "우니, 팡이";
  let titles = ["소개글", "활동", "굿즈"];
  let [likes, setLikes] = useState(0);

  const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPwd] = useState("");

    const handleInputEmail = (e) => {
      setEmail(e.target.value);
    };

    const handleInputPwd = (e) => {
      setPwd(e.target.value);
    };

    const test = () => {
      return email.includes("@") && pwdRegEx.test(password);
    };

    const pwdRegEx =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,12}$/;

    const a = pwdRegEx.test(password);

    const loginConfirm = (e) => {
      e.preventDefault();
      if (email.length === 0 || a.length === 0) {
        window.alert("sdfsdf");
      } else {
        window.alert("else");
      }
    };
  };

  return (
    <div className="wrap">
      <div className="wrap_header">
        <img src={img_logo} width="48px" />
        <h4>
          {webTitle}
          <span
            onClick={() => {
              setLikes(likes + 1);
            }}
          >
            __________❤️
          </span>
          {likes}
        </h4>
      </div>

      <div className="dashboard">
        <Sidebar />
      </div>

      <div className="main_page">
        <img src={img_logo} width="150px" />
        <h1>당신을 환영하는!🎉</h1>
        <form>
          명함을 써라:
          <input />
        </form>
      </div>
    </div>
  );
}

export default App;
