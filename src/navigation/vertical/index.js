import { Home, Users, List, Grid, Video } from "react-feather";

export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "customer",
    title: "Customers",
    icon: <Users size={20} />,
    children: [
      {
        id: "customer",
        title: "Customers",
        icon: <Users size={20} />,
        navLink: "/customers",
      },
      // {
      //     id: "customer-group",
      //     title: "Groups",
      //     icon: <List size={20}/>,
      //     navLink: "/customers-group"
      // }
    ],
  },
  {
    id: "Services",
    title: "Services",
    icon: <List size={20} />,
    children: [
      {
        id: "Services-service",
        title: "Licenses",
        icon: <List size={20} />,
        navLink: "/services",
      },
      // {
      //     id: "Services-service-Type",
      //     title: "Service Type",
      //     icon: <Mail size={20}/>,
      //     navLink: "/Services-service-Type"
      // }
    ],
  },
  {
    id: "Products",
    title: "Products",
    icon: <Grid size={20} />,
    children: [
      {
        id: "products-add",
        title: "Products",
        icon: <Grid size={20} />,
        navLink: "/products",
      },
    ],
  },
  {
    id: "trainingVideos",
    title: "Training Videos",
    icon: <Video size={20} />,
    navLink: "/trainingVideos",
  },
];
