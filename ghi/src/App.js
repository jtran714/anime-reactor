import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favorites from "./Favorites";
import FavoriteForm from "./FavoriteForm";
import Nav from "./Nav";
import LoginForm from "./LoginForm";
import MainPage from "./MainPage";
import { useToken, AuthContext, AuthProvider, useAuthContext } from "./auth";

function GetToken() {
  useToken();
  return null;
}

export default function App() {
  const { token } = useAuthContext();
  console.log(token);
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <GetToken />
          <Nav />
          <div>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="login/" element={<LoginForm />} />
              <Route path="favorites/" element={<Favorites />} />
              <Route path="favorites/new" element={<FavoriteForm />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}
