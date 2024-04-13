import { Routes, Route } from "react-router-dom";

import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import "./globals.css";
import Home from "./_root/pages/Home";
import AskQuestions from "./_root/pages/AskQuestions";
import EditProfile from "./_root/pages/EditProfile";
import CreatePost from "./_root/pages/CreatePost";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/askQuestions" element={<AskQuestions />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/createPost" element={<CreatePost />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
