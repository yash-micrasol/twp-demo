import React, { useEffect } from 'react';
import DashBoardLayout from './Layout';
import dollar from '../../assets/dollar.png';
import items from '../../assets/items.png';
import invoice from '../../assets/openInvoices.png';
import customer from '../../assets/customers.png';
import order from '../../assets/pendingorders.png';
import document from '../../assets/documents.png';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardData } from '../../store/dashboard/slice';
import { useNavigate } from 'react-router-dom';
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
        <p className="border-l border-black h-16" />
        <div className="flex flex-col space-y-1">
          {title}
          {subTitle}
        </div>
      </div>
    );
  };

  return (
    <DashBoardLayout data={data}>
      {status === 'loading' ? (
        <Loader />
      ) : (
        <div className="mx-2 flex flex-1 overflow-auto flex-col space-y-3">
          <Card
            route="/sales"
            img={dollar}
            title={<p className="text-pink">${data?.sales_month_invoices ?? ''}</p>}
            subTitle={<p className="text-darkGray text-lg">Sales month to date ({monthShort})</p>}
          />

          <Card
            route="/items"
            img={items}
            title={<p className="text-blue">{data?.total_items ?? ''}</p>}
            subTitle={
              <p className="text-darkGray text-lg">
                Items <span className="text-redLight">({data?.new_items_count ?? ''} New)</span>
              </p>
            }
          />

          <Card
            route="/invoice"
            img={invoice}
            title={<p className="text-orange">${data?.pending_invoices ?? ''}</p>}
            subTitle={
              <p className="text-darkGray text-lg">
                Open Invoices{' '}
                <span className="text-redLight">
                  ({data?.new_pending_invoices_count ?? ''} New)
                </span>
              </p>
            }
          />

          <Card
            route="/customer"
            img={customer}
            title={<p className="text-pink">{data?.total_customer ?? ''}</p>}
            subTitle={<p className="text-darkGray text-lg">Customers</p>}
          />

          <Card
            route="/pending-order"
            img={order}
            title={
              <p className="text-redLight">
                {data?.pending_invoices_count ?? ''}{' '}
                <span className="text-darkGray">(${data?.pending_order ?? ''})</span>
              </p>
            }
            subTitle={
              <p className="text-darkGray text-lg">
                Pending Orders{' '}
                <span className="text-redLight">({data?.qb_inv_count ?? ''} in QB)</span>
              </p>
            }
          />

          <Card
            route="/documents"
            img={document}
            title={<p className="text-greenLight">{data?.document ?? ''}</p>}
            subTitle={<p className="text-darkGray text-lg">Documents</p>}
          />
        </div>
      )}
    </DashBoardLayout>
  );
};

export default Dashboard;
