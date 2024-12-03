import Dashboard from "../dashboard";
import LoginPage from "../homelogin";
import Login from "../login";
import SPSODashboard from "../pages/spso/SPSODashboard";
import Stats from "../pages/stats";
import PrintDocument from "../printdocument";

const routes = [
  { path: "/", component: PrintDocument},
  { path: "/log-in", component: LoginPage },
  { path: "/log", component: Login },
  { path: "/spso", component: SPSODashboard },
  { path: "/stats", component: Stats },
];

export { routes };
