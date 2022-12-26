import React, { useEffect } from 'react';
import DashBoardLayout from './Layout';
import dollar from '../../assets/dollar.webp';
import items from '../../assets/items.webp';
import invoice from '../../assets/openInvoices.webp';
import customer from '../../assets/customers.webp';
import order from '../../assets/pendingorders.webp';
import document from '../../assets/documents.webp';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardData } from "../../store/dashboard/slice";
import { useNavigate } from "react-router-dom";
import { monthShort } from '../../helpers/constant';
import Loader from '../../components/Loader';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { data, status } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);

  const Card = ({ route = '/', img, title, subTitle }) => {
    const navigate = useNavigate();
    return (
      <div
        className="bg-white p-2 flex space-x-3 items-center shadow-md rounded border border-[#f3f3f3] text-xl cursor-pointer"
        onClick={() => navigate(route)}
      >
        <img src={img} alt="logo" className="w-14 h-14" />
        <p className="h-16 border-l border-black" />
        <div className="flex flex-col space-y-1">
          {title}
          {subTitle}
        </div>
      </div>
    );
  };

  return (
    <DashBoardLayout data={data}>
      {status === "loading" ? (
        <Loader />
      ) : (
        <div className="flex flex-col flex-1 mx-2 space-y-3 overflow-auto">
          <Card
            route="/sales"
            img={dollar}
            title={
              <p className="text-pink">${data?.sales_month_invoices ?? ""}</p>
            }
            subTitle={
              <p className="text-lg text-darkGray">
                Sales month to date ({monthShort})
              </p>
            }
          />

          <Card
            route="/items"
            img={items}
            title={<p className="text-blue">{data?.total_items ?? ""}</p>}
            subTitle={
              <p className="text-lg text-darkGray">
                Items{" "}
                <span className="text-redLight">
                  ({data?.new_items_count ?? ""} New)
                </span>
              </p>
            }
          />

          <Card
            route="/invoice"
            img={invoice}
            title={
              <p className="text-orange">${data?.pending_invoices ?? ""}</p>
            }
            subTitle={
              <p className="text-lg text-darkGray">
                Open Invoices{" "}
                <span className="text-redLight">
                  ({data?.new_pending_invoices_count ?? ""} New)
                </span>
              </p>
            }
          />

          <Card
            route="/customer"
            img={customer}
            title={<p className="text-pink">{data?.total_customer ?? ""}</p>}
            subTitle={<p className="text-lg text-darkGray">Customers</p>}
          />

          <Card
            route="/pending-order"
            img={order}
            title={
              <p className="text-redLight">
                {data?.pending_invoices_count ?? ""}{" "}
                <span className="text-darkGray">
                  (${data?.pending_order ?? ""})
                </span>
              </p>
            }
            subTitle={
              <p className="text-lg text-darkGray">
                Pending Orders{" "}
                <span className="text-redLight">
                  ({data?.qb_inv_count ?? ""} in QB)
                </span>
              </p>
            }
          />

          <Card
            route="/documents"
            img={document}
            title={<p className="text-greenLight">{data?.document ?? ""}</p>}
            subTitle={<p className="text-lg text-darkGray">Documents</p>}
          />
        </div>
      )}
    </DashBoardLayout>
  );
};

export default Dashboard;
