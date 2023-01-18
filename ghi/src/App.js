import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import { BrowserRouter, Route } from "react-router-dom";
import Nav from "./Nav";
import SignUpForm from "./SignUpForm.js";
import "./App.css";


function App() {
  // const [launch_info, setLaunchInfo] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function getData() {
  //     let url = `${process.env.REACT_APP_ACCOUNTS}/api/launch-details`;
  //     console.log("fastapi url: ", url);
  //     let response = await fetch(url);
  //     console.log("------- hello? -------");
  //     let data = await response.json();

  //     if (response.ok) {
  //       console.log("got launch data!");
  //       setLaunchInfo(data.launch_details);
  //     } else {
  //       console.log("drat! something happened");
  //       setError(data.message);
  //     }
  //   }
  //   getData();
  // }, []);

  return (
    <div>
      {/* <ErrorNotification error={error} />
      <Construct info={launch_info} /> */}
      <BrowserRouter>
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/SignUpForm" element={<SignUpForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
