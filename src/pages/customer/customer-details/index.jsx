import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import { SimpleHeader } from '../../../components/headers';
import Loader from '../../../components/Loader';
import { customerDetails } from '../../../store/customer/slice';

const CustomerDetail = () => {
  const { state } = useLocation();
  const customer_id = state?.customer_id ?? null;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { customer, status } = useSelector((store) => store.customer);

  const shortName = customer?.customer_name?.split(' ') ?? [];

  const address1 = `${customer?.street1} ${
    customer?.street2 ? ', ' + (customer?.street2 ?? '') : ''
  }`;
  const address2 = `${customer?.city}, ${customer?.state}, ${customer?.zip}`;

  const ship_address = `${customer?.ship_street1} ${
    customer?.ship_street2 && ', ' + (customer?.street2 ?? '')
  } , ${customer?.ship_city}, ${customer?.ship_state}, ${customer?.ship_zip}`;

  useEffect(() => {
    if (customer_id) {
      dispatch(customerDetails({ customer_id }));
    } else {
      navigate('/customer');
    }
  }, [customer_id, dispatch, navigate]);

  return (
    <div>
      <SimpleHeader title={'Customer Details'} />
      {status === 'loading' ? (
        <Loader />
      ) : (
        <div className="m-3 rounded bg-white">
          <div className="w-full flex space-x-4 items-center bg-blue p-3 rounded-t-md">
            <span>
              <p className="bg-white text-blue text-4xl w-20 h-20 flex items-center justify-center rounded-full">
                {shortName[0]?.charAt(0)}
                {shortName[1]?.charAt(0)}
              </p>
            </span>
            <span className="space-y-1">
              <p className="text-white font-semibold">{customer?.customer_name}</p>
              <p className="text-white font-semibold">{address1}</p>
              <p className="text-white font-semibold">{address2}</p>
            </span>
          </div>
          <div className="p-3 space-y-3 border rounded-b-md">
            <p className="font-semibold">Shipping Details:</p>
            <p>{ship_address}</p>
            <hr />
            <p className="font-semibold">Primary Contact:</p>
            <p>{customer?.primary_contact_phone ?? '-'}</p>
            <hr />
            <p className="font-semibold">Liquor Id:</p>
            <p>{customer?.liquor_id ?? '-'}</p>
            <hr />
            <p className="font-semibold">Payment Type:</p>
            <p>{customer?.payment_type ?? '-'}</p>
            <hr />
            <p className="font-semibold">Note:</p>
            <p>{customer?.note ?? '-'}</p>
          </div>
          <div className="m-3 flex justify-between items-center gap-6">
            <Button
              className="w-full"
              onClick={() => {
                navigate('new-order', {
                  state: {
                    customer_id,
                    email: customer.email,
                    name: customer?.customer_name
                  }
                });
              }}
            >
              New Order
            </Button>
            <Button
              className="w-full"
              onClick={() => {
                navigate('ordered-items', {
                  state: { customer_id }
                });
              }}
            >
              Order History
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDetail;
