import Dashboard from "../dashboard";
import LoginPage from "../homelogin";
import Login from "../login";
import PrinterDetail from "../pages/printerDetail/printerDetail";
import SPSODashboard from "../pages/spso/SPSODashboard";
import Stats from "../pages/stats";

const routes = [
  { path: "/", component: Dashboard },
  { path: "/log-in", component: LoginPage },
  { path: "/log", component: Login },
  { path: "/spso", component: SPSODashboard },
  { path: "/stats", component: Stats },
  { path: "/printer", component: PrinterDetail },
];

export { routes };
