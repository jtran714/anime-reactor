import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";

function App() {
  const [launch_info, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_ACCOUNTS}/api/launch-details`;
      let response = await fetch(url);
      let data = await response.json();

      if (response.ok) {
        setLaunchInfo(data.launch_details);
      } else {
        setError(data.message);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <ErrorNotification error={error} />
      <Construct info={launch_info} />
    </div>
  );
}

export default App;
