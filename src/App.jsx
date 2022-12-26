import React, { Suspense } from "react";
import AppRoutes from "./routes";
import Loader from "./components/Loader";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
