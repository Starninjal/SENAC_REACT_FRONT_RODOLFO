import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PaginaInicial from "./Pages/PaginaInicial/PaginaInicial";
import Autor from "./Pages/Autor/Autor";
import Cardapio from "./Pages/Cardapio/Cardapio";
import Shares from "./Pages/Shares/Share";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js'
import FAQ from "./Pages/Questions/FAQ";
import SAC from "./Pages/SAC/SAC";
import Contact from "./Pages/Contact/Contact";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/admin" />
        <Route path="/autor" element={<Autor />} />
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="/Share" element={<Shares/>} />
        <Route path ="/FAQ" element={<FAQ />} />
        <Route path="/SAC" element={<SAC />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
