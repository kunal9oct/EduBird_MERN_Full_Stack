import { Outlet, Navigate } from "react-router-dom";

import Topbar from "../components/shared/Topbar";
import Bottombar from "../components/shared/Bottombar";
import LeftSidebar from "../components/shared/LeftSidebar";

const RootLayout = () => {
  let isAuthenticated = true;
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    isAuthenticated = false;
  }

  return (
    <>
      {isAuthenticated ? (
        <div className="w-full md:flex">
          <Topbar />
          <LeftSidebar />

          <section className="flex flex-1 h-full">
            <Outlet />
          </section>

          <Bottombar />
        </div>
      ) : (
        <Navigate to="/sign-in" />
      )}
    </>
  );
};

export default RootLayout;
