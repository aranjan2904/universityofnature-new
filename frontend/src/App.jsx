import { HashRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Programs from "./pages/Programs";
import Faculty from "./pages/Faculty";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Admin from "./pages/Admin";
import AdminGallery from "./pages/AdminGallery";
import AdminPrograms from "./pages/AdminPrograms";
import AdminFaculty from "./pages/AdminFaculty";
import AdminMessages from "./pages/AdminMessages";

function App() {
  return (
    <HashRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mission" element={<About />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/gallery" element={<AdminGallery />} />
        <Route path="/admin/programs" element={<AdminPrograms />} />
        <Route path="/admin/faculty" element={<AdminFaculty />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
      </Routes>
    </HashRouter>
  );
}

export default App;