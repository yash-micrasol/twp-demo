import React, { lazy, useEffect } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";

const Auth = lazy(() => import("../pages/auth"));
const Items = lazy(() => import("../pages/items"));
const Sales = lazy(() => import("../pages/sales"));
const Invoice = lazy(() => import("../pages/invoice"));
const Customer = lazy(() => import("../pages/customer"));
const Dashboard = lazy(() => import("../pages/dashboard"));
const Documents = lazy(() => import("../pages/documents"));
const AddItems = lazy(() => import("../pages/invoice/add-items"));
const NewOrder = lazy(() => import("../pages/customer/new-order"));
const PendingOrders = lazy(() => import("../pages/pending-orders"));
const ItemDetails = lazy(() => import("../pages/items/item-details"));
const InvoiceItem = lazy(() => import("../pages/invoice/invoice-item"));
const ReviewOrder = lazy(() => import("../pages/customer/review-order"));
const OrderedItems = lazy(() => import("../pages/customer/ordered-items"));
const OrderHistory = lazy(() => import("../pages/customer/order-history"));
const InvoiceDetail = lazy(() => import("../pages/invoice/invoice-detail"));
const DocumentsList = lazy(() => import("../pages/documents/document-list"));
const SubFolderList = lazy(() => import("../pages/documents/sub-folder-list"));
const CustomerDetails = lazy(() =>
  import("../pages/customer/customer-details")
);
const PendingOrderDetails = lazy(() =>
  import("../pages/pending-orders/pending-order-details")
);

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

const AppRoutes = () => {
  return (
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
        {/* Invoice */}
        <Route
          path="/invoice/*"
          element={
            <Routes>
              <Route path="/" element={<Invoice />} />
              <Route
                path="/:id/*"
                element={
                  <Routes>
                    <Route path="/" element={<InvoiceItem />} />
                    <Route
                      path="/:invoiceNumber/*"
                      element={
                        <Routes>
                          <Route path="/" element={<InvoiceDetail />} />
                          <Route path="/:invoiceId" element={<AddItems />} />
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
                path="/:id/*"
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
                          <Route
                            path="/review-order"
                            element={<ReviewOrder />}
                          />
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
              <Route path="/:invoiceNumber" element={<PendingOrderDetails />} />
            </Routes>
          }
        />
        {/* Documents */}
        <Route
          path="/documents/*"
          element={
            <Routes>
              <Route path="/" element={<Documents />} />
              {/* <Route element={<DocumentsList />} /> */}
              <Route
                path="/:index/*"
                element={
                  <Routes>
                    <Route path="/" element={<DocumentsList />} />
                    <Route path="/:folderId" element={<SubFolderList />} />
                  </Routes>
                }
              />
            </Routes>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
