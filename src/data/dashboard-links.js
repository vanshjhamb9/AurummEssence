import { ACCOUNT_TYPE } from "../utils/constrants";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/admin",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "My Products",
    path: "/dashboard/my-products",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Product",
    path: "/dashboard/add-product",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "My Address",
    path: "/dashboard/address",
    type: ACCOUNT_TYPE.CONSUMER,
    icon: "VscHome",
  },
  {
    id: 6,
    name: "Purchase History",
    path: "/dashboard/purchase-history",
    type: ACCOUNT_TYPE.CONSUMER,
    icon: "VscHistory",
  },
];
