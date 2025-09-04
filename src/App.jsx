import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from './Navbar';
import Blog from './Blog';
import AddBlog from './AddBlog';
import BlogDetail from './BlogDetail';
import EditBlog from "./EditBlog"
import BlogList from "./veiwBlog";
// Layout with Navbar
function LayoutWithNavbar() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

// Layout without Navbar
function LayoutWithoutNavbar() {
  return <Outlet />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes with Navbar */}
        <Route element={<LayoutWithNavbar />}>
          <Route path="/" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
        </Route>

        {/* Routes without Navbar */}
        <Route element={<LayoutWithoutNavbar />}>
          <Route path="/edit/:id" element={<EditBlog />} />
          <Route path="/add" element={<AddBlog />} />
          <Route path="/blogList" element={<BlogList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
