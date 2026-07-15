import { Routes, Route } from "react-router-dom";

import Hero from "./components/layout/Hero";
import UploadPage from "./pages/Upload";
import Result from "./pages/Result";
import Loading from "./pages/Loading";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}