import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Suspense>
      <BrowserRouter>
        <Routes>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
