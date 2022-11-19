import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Loader from './components/Loader';
import AppRoutes from './routes';
// import AppRoutes from "@routes/index";

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
