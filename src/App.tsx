import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Character = lazy(() => import('./Components/Character'));
const Home = lazy(() => import('./Components/Home'));

function App() {
  return (
    <Suspense>
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
