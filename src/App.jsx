import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CategoriesProvider } from "./contexts/CategoriesContext";
import Layout from "./components/Layout";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostTask from "./pages/PostTask";
import NearbyTasks from "./pages/NearbyTasks";
import TaskDetail from "./pages/TaskDetail";
import MyTasks from "./pages/MyTasks";
import PostedTasks from "./pages/PostedTasks";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import TaskStatus from "./pages/TaskStatus";
import Wallet from "./pages/Wallet";
import Settings from "./pages/Settings";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";
import Community from "./pages/Community";
import Safety from "./pages/Safety";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import About from "./pages/About";
import Career from "./pages/Career";
import Blog from "./pages/Blog";
import HowItWorks from "./pages/HowItWorks";
import Categories from "./pages/Categories";

// Component to handle root route redirection
const RootRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  // If user is logged in, redirect to profile, otherwise show landing page
  return user ? <Navigate to="/tasks" replace /> : <Landing />;
};

function App() {
  return (
    <AuthProvider>
      <CategoriesProvider>
        <BrowserRouter>
          <Routes>
          {/* Login and Register pages without layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Layout wrapper for all pages including Landing */}
          <Route element={<Layout />}>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/post-task" element={<PostTask />} />
            <Route path="/tasks" element={<NearbyTasks />} />
            <Route path="/task/:id" element={<TaskDetail />} />
            <Route path="/my-tasks" element={<MyTasks />} />
            <Route path="/posted-tasks" element={<PostedTasks />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/task-status" element={<TaskStatus />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/community" element={<Community />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/about" element={<About />} />
            <Route path="/career" element={<Career />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/categories" element={<Categories />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </CategoriesProvider>
    </AuthProvider>
  );
}

export default App;
