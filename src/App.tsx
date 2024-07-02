import { Routes, Route } from "react-router-dom";
import { FormsPage, HomePage } from "./pages/";
import { Layout } from "./pages/layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/setup" element={<FormsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
