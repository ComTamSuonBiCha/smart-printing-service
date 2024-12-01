import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";

// import loginHeader from './loginHeader'
function App() {
  return (
    <div>
      <Routes>
        {routes.map((route, index) => {
          const Layout = route.layout ? route.layout : Fragment;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
