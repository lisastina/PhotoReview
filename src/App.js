import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import HomePage from "./pages/HomePage";
import RequireAuth from "./components/RequireAuth";
import LoginPage from "./pages/LoginPage";
import AlbumPage from "./pages/AlbumPage";
import LogoutPage from "./pages/LogoutPage";
import UploadAlbumPage from "./pages/UploadAlbumPage";
import Navigation from "./components/Navigation";

function App() {
  return (
    <>
      <Navigation />

      <Container className="App mt-4">
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth redirect="/login">
                <HomePage />
              </RequireAuth>
            }
          />
          <Route
            path="/upload"
            element={
              <RequireAuth redirect="/login">
                <UploadAlbumPage />
              </RequireAuth>
            }
          />

          <Route path="/:id" element={<AlbumPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
