import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchHeader } from '../../../components/headers';
import Loader from '../../../components/Loader';
import { customerDetails, setInvoice } from '../../../store/customer/slice';
import OrderedItemsCard from '../components/OrderedItemsCard';

const OrderedItems = () => {
  const { state } = useLocation();
  const { customer_id } = state;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [loading, setLoading] = useState(true);

  const { invoice } = useSelector((store) => store.customer);

  useEffect(() => {
    if (customer_id && invoice.length === 0) {
      dispatch(customerDetails({ customer_id }));
    } else if (!customer_id) {
      navigate('/customer');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer_id, dispatch, navigate]);

  useEffect(() => {
    let filterTimeout;
    setLoading(true);
    if (search === '') {
      dispatch(customerDetails({ customer_id })).then(() => {
        setLoading(false);
      });
    } else if (search !== '') {
      setLoading(true);
      clearTimeout(filterTimeout);
      filterTimeout = setTimeout(() => {
        const temp = invoice.filter((inv) => inv.item.toLowerCase().includes(search.toLowerCase()));
        dispatch(setInvoice([...temp]));
        setLoading(false);
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div>
      <SearchHeader
        search={search}
        isSearch={isSearch}
        setIsSearch={setIsSearch}
        setSearch={setSearch}
        title="Ordered Items"
      />
      <div className="space-y-1">
        {loading ? (
          <Loader />
        ) : (
          <>
            {!invoice.length && (
              <p className="text-darkGray text-center py-12">No Data Available</p>
            )}

            {invoice.map((data, key) => {
              return <OrderedItemsCard key={key} data={data} customer_id={customer_id} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default OrderedItems;
