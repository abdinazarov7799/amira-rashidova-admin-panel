import React, {Suspense} from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// LAYOUTS
import DashboardLayout from "../layouts/dashboard/DashboardLayout.jsx";
import AuthLayout from "../layouts/auth/AuthLayout.jsx";
// LAYOUTS

// AUTH
import IsAuth from "../services/auth/IsAuth";
import IsGuest from "../services/auth/IsGuest";
import LoginPage from "../modules/auth/pages/LoginPage";
// AUTH

// 404
import NotFoundPage from  "../modules/auth/pages/NotFoundPage";
// 404

// PAGES
import TranslationPage from "../modules/translation/pages/TranslationPage.jsx";
import OverlayLoader from "../components/OverlayLoader.jsx";
import UsersPage from "../modules/users/pages/UsersPage.jsx";
import PromoUsersPage from "../modules/promo-users/pages/PromoUsersPage.jsx";
import PrizePage from "../modules/prize/pages/PrizePage.jsx";
import CoursePage from "../modules/course/pages/CoursePage.jsx";
// PAGES


const Router = ({ ...rest }) => {
  return (
    <BrowserRouter>
      <Suspense fallback={<OverlayLoader />}>
        <IsAuth>
          <Routes>
            <Route path={"/"} element={<DashboardLayout />}>
              <Route
                  path={"/courses"}
                  element={<CoursePage />}
              />
              <Route
                  path={"/prizes"}
                  element={<PrizePage />}
              />
              <Route
                  path={"/promo-users"}
                  element={<PromoUsersPage />}
              />
              <Route
                  path={"/users"}
                  element={<UsersPage />}
              />
              <Route
                  path={"/translations"}
                  element={<TranslationPage />}
              />
              <Route
                  path={"auth/*"}
                  element={<Navigate to={"/courses"} replace />}
              />
              <Route
                  path={"/"}
                  element={<Navigate to={"/courses"} replace />}
              />
              <Route path={"*"} element={<NotFoundPage />} />
            </Route>
          </Routes>
        </IsAuth>

        <IsGuest>
          <Routes>
            <Route path={"/auth"} element={<AuthLayout />}>
              <Route index element={<LoginPage />} />
            </Route>
            <Route path={"*"} element={<Navigate to={"/auth"} replace />} />
          </Routes>
        </IsGuest>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
