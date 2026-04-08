import React from "react";

import { AuthStaffProvider } from '../actors/staff/staff_context/AuthStaffProvider.jsx'
import { DialogProvider } from '../actors/staff/staff_context/DialogProvider.jsx'
import ProtectedKitchenRoute from '../actors/kitchen/kitchen_context/ProtectedKitchenRoute.jsx';

import Layout from "../actors/kitchen/kitchen_pages/Kitchen_Layout"
import Floor1 from "../actors/kitchen/kitchen_pages/Kitchen_Floor1"
import Floor2 from "../actors/kitchen/kitchen_pages/Kitchen_Floor2"
import OrdDetailTable from "../actors/kitchen/kitchen_pages/Kitchen_OrdDetailTable";
import OrdDetailOrd from "../actors/kitchen/kitchen_pages/Kitchen_OrdDetailOrd.jsx";
import OrdAll from "../actors/kitchen/kitchen_pages/Kitchen_OrdAll";
import OrdDetail from "../actors/kitchen/kitchen_pages/Kitchen_OrdDetail";
import Login from "../actors/kitchen/kitchen_pages/Kitchen_Login";

const KitchenRouter = [
 {
  path: "/kitchen",
  element: <AuthStaffProvider />, 
  children: [
    {
      path: "login",
      element: <Login />,
    },
    {
      element: (
        <ProtectedKitchenRoute>
          <DialogProvider> 
            <Layout />
          </DialogProvider>
        </ProtectedKitchenRoute>
      ),
      children: [
        { index: true, element: <Floor1 /> },
        { path: "f2", element: <Floor2 /> },
        { path: ":tableCode/ord_table", element: <OrdDetailTable  /> },
        { path: ":tableCode/ord_ord", element: <OrdDetailOrd  /> },
        { path: "all", element: <OrdAll /> },
        { path: "detail", element: <OrdDetail /> },
        
      ],
    },
  ],
},
];

export default KitchenRouter;