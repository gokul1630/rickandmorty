import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loader from './Components/Loader';

const Character = lazy(() => import('./Pages/Character'));
const Home = lazy(() => import('./Pages/Home'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/:id" element={<Character />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
