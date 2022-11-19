// import Auth from "@pages/auth";
import React, { lazy, useEffect } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
const Auth = lazy(() => import("../pages/auth"));
const Customer = lazy(() => import("../pages/customer"));
const CustomerDetails = lazy(() =>
  import("../pages/customer/customer-details")
);
const NewOrder = lazy(() => import("../pages/customer/new-order"));
const ReviewOrder = lazy(() => import("../pages/customer/review-order"));
const OrderedItems = lazy(() => import("../pages/customer/ordered-items"));
const OrderHistory = lazy(() => import("../pages/customer/order-history"));
const Dashboard = lazy(() => import("../pages/dashboard"));
const Invoice = lazy(() => import("../pages/invoice"));
const InvoiceDetail = lazy(() => import("../pages/invoice/invoice-detail"));
const InvoiceItem = lazy(() => import("../pages/invoice/invoice-item"));
const Items = lazy(() => import("../pages/items"));
const Sales = lazy(() => import("../pages/sales"));
const PendingOrders = lazy(() => import("../pages/pending-orders"));
const PendingOrderDetails = lazy(() =>
  import("../pages/pending-orders/pending-order-details")
);
const Documents = lazy(() => import("../pages/documents"));
const SubFolder = lazy(() => import("../pages/documents/sub-folder"));
const DocumentsList = lazy(() => import("../pages/documents/document-list"));
const SubFolderList = lazy(() => import("../pages/documents/sub-folder-list"));
const ItemDetails = lazy(() => import("../pages/items/item-details"));
const AddItems = lazy(() => import("../pages/invoice/add-items"));

const AuthLayout = () => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <Outlet />
      </div>
    </div>
  );
};

const DefaultLayout = () => {
  const token = localStorage.getItem("accessToken");
  return token ? <Outlet /> : <Navigate to="/login" />;
};

const AppRoutes = () => (
  <Routes>
    {/* Auth */}
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<Auth />} />
    </Route>

    <Route element={<DefaultLayout />}>
      {/* Dashboard */}

      <Route index path="/" element={<Dashboard />} />
      {/* Sales */}
      <Route path="/sales" element={<Sales />} />
      {/* Items */}
      <Route
        path="/items/*"
        element={
          <Routes>
            <Route path="/" element={<Items />} />
            <Route path="/details" element={<ItemDetails />} />
          </Routes>
        }
      />
      {/* Inovice */}
      <Route
        path="/invoice/*"
        element={
          <Routes>
            <Route path="/" element={<Invoice />} />
            <Route
              path="/invoice-item/*"
              element={
                <Routes>
                  <Route path="/" element={<InvoiceItem />} />
                  <Route
                    path="/invoice-details/*"
                    element={
                      <Routes>
                        <Route path="/" element={<InvoiceDetail />} />
                        <Route path="/add-items" element={<AddItems />} />
                      </Routes>
                    }
                  />
                </Routes>
              }
            />
          </Routes>
        }
      />
      {/* Customer */}
      <Route
        path="/customer/*"
        element={
          <Routes>
            <Route path="/" element={<Customer />} />
            <Route
              path="/details/*"
              element={
                <Routes>
                  <Route path="/" element={<CustomerDetails />} />
                  <Route
                    path="/ordered-items/*"
                    element={
                      <Routes>
                        <Route path="/" element={<OrderedItems />} />
                        <Route
                          path="/order-history"
                          element={<OrderHistory />}
                        />
                      </Routes>
                    }
                  />
                  <Route
                    path="/new-order/*"
                    element={
                      <Routes>
                        <Route path="/" element={<NewOrder />} />
                        <Route path="/review-order" element={<ReviewOrder />} />
                      </Routes>
                    }
                  />
                </Routes>
              }
            />
          </Routes>
        }
      />
      {/* Pending Order */}
      <Route
        path="/pending-order/*"
        element={
          <Routes>
            <Route path="/" element={<PendingOrders />} />
            <Route path="/details" element={<PendingOrderDetails />} />
          </Routes>
        }
      />
      {/* Documents */}
      <Route
        path="/documents/*"
        element={
          <Routes>
            <Route path="/" element={<Documents />} />
            <Route path="/document-list" element={<DocumentsList />} />
            <Route
              path="/sub-folder/*"
              element={
                <Routes>
                  <Route path="/" element={<SubFolder />} />
                  <Route path="/list" element={<SubFolderList />} />
                </Routes>
              }
            />
          </Routes>
        }
      />
    </Route>
  </Routes>
);

export default AppRoutes;
