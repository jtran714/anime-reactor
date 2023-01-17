import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import LoginForm from "./LoginForm";
import MainPage from "./MainPage";
import { useToken, AuthProvider, useAuthContext } from "./auth.js";

function GetToken() {
  useToken();
  return null;
}

function App() {
  const { token } = useAuthContext();
  console.log(token);
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <GetToken />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="login/" element={<LoginForm />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
// function App() {
//   const [launch_info, setLaunchInfo] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function getData() {
//       let url = `${process.env.REACT_APP_ACCOUNTS_API_HOST}/api/launch-details`;
//       console.log("fastapi url: ", url);
//       let response = await fetch(url);
//       console.log("------- hello? -------");
//       let data = await response.json();

//       if (response.ok) {
//         console.log("got launch data!");
//         setLaunchInfo(data.launch_details);
//       } else {
//         console.log("drat! something happened");
//         setError(data.message);
//       }
//     }
//     getData();
//   }, []);

//   return (
//     <div>
//       <ErrorNotification error={error} />
//       <Construct info={launch_info} />
//     </div>
//   );
// }
