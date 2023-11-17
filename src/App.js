import Login from "./components/Login";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Routes, Route, useNavigate } from "react-router-dom"
import { useEffect, useContext, useState } from "react";
import Registration from "./components/Registration";
import { LoginContext } from "./components/ContextProvider/Context";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";

function App() {
  const [data, setData] = useState(false);
  const { setLoginData } = useContext(LoginContext);
  const history = useNavigate();

  useEffect(() => {
    const DashboardValid = async () => {
      let token = localStorage.getItem("usersdatatoken");
      console.log("Token:", token);
      const res = await fetch("/validuser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      });

      const data = await res.json();

      if (data.status === 401 || !data) {
        console.log("user not valid");
      } else {
        console.log("user verify");
        setLoginData(data);
        history("/dash");
      }
    };

    const fetchData = async () => {
      await DashboardValid();
      setData(true);
    };

    setTimeout(() => {
      fetchData();
    }, 2000);

  }, [history, setLoginData]);

  return (
    <>
      {data ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/dash" element={<Dashboard />} />
          </Routes>
        </>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}
    </>
  );
}

export default App;
