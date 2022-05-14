import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "./index.css";

import Fallback from "../../components/Fallback";

const LandingPage = lazy(() => import("../LandingPage"));
const Members = lazy(() => import("../Members"));

export function App() {
  return (
    <Router basename={process.env.PUBLIC_URL + "/"}>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Fallback />}>
              <LandingPage />
            </Suspense>
          }
        />

        <Route
          path="members"
          element={
            <Suspense fallback={<Fallback />}>
              <Members />
            </Suspense>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
