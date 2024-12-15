import React from "react";
import { AuthProvider } from "./context/AuthContext";
import Routing from "./routes/Routing";

const App = () => {
  return (
    <AuthProvider>
      <Routing />
    </AuthProvider>
  );
};

export default App;

