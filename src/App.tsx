import React from "react";
import { BrowserRouter } from "react-router-dom";
import RootRoutes from "./RootRoutes";
function App() {
  return (
      <BrowserRouter>
        <RootRoutes />
      </BrowserRouter>
  );
}
export default App;