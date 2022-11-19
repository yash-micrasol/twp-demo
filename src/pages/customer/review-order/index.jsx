import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import { SimpleHeader } from '../../../components/headers';
import ReviewOrderCard from '../components/ReviewOrderCard';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { newOrder } from '../../../store/customer/slice';
import { useDispatch } from 'react-redux';
import { formatDate } from '../../../helpers/constant';

const ReviewOrder = () => {
  const { state } = useLocation();
  const { order, total, customer_id } = state;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [date, setDate] = useState({ e: null, formatedDate: null });
  const [note, setNote] = useState('');

  useEffect(() => {
    if (!state) {
      navigate(-1);
    }
  }, [navigate, state]);

  return (
    <div className="font-semibold">
      <SimpleHeader title="Review Order" />
      <div className="h-[calc(100vh-390px)] overflow-y-auto no-scrollbar space-y-1 mt-2">
        {Object.values(order).map((data, key) => {
          return <ReviewOrderCard key={key} data={data} />;
        })}
      </div>

      <div className="">
        <div className="flex flex-col space-y-2 bg-red-200 p-3">
          <p className="text-center text-lg my-1">Order total : ${total}</p>
          <label htmlFor="date">Preferred delivery date</label>
          <DatePicker
            id="date"
            name="Date"
            selected={date.e}
            onChange={(e) => {
              const temp = formatDate(e);
              setDate({ e, formatedDate: temp });
            }}
            placeholderText="Select Date"
            dateFormat="MM/dd/yyyy"
            className="w-full p-3 focus:outline-none rounded-md"
          />
          <label htmlFor="note">Note</label>
          <textarea
            id="note"
            rows={3}
            value={note}
            name="note"
            placeholder="Enter Note"
            onChange={(e) => setNote(e.target.value)}
            className="p-2 focus:outline-none rounded-md resize-none"
          />
        </div>
        <Button
          className="w-full rounded-none"
          onClick={() => {
            dispatch(
              newOrder({
                delivery_date: date.formatedDate,
                note,
                customer_id,
                item_details: JSON.stringify(
                  Object.values(order).map((e) => {
                    return { item_id: e.item_id, qty: e.qty };
                  })
                )
              })
            );
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ReviewOrder;
