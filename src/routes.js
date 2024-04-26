
import Dashboard from "./views/dashboard/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Statistics.js";
import Score from "views/Score.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Statistics",
    icon: "fas fa-chart-bar text",
    component: <TableList />,
    layout: "/admin",
  },
    
  {
    path: "/maps",
    name: "Score",
    icon: "nc-icon nc-tile-56",
    component: <Score />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Rewards",
    icon: "nc-icon nc-diamond",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: <Notifications />,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: <UserPage />,
    layout: "/admin",
  },

  {
    path: "/typography",
    name: "Score",
    icon: "fas fa-star text",
    component: <Typography />,
    layout: "/admin",
  }
];
export default routes;
