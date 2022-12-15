import React, { useEffect } from "react";
import Chart from "./components/Chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { month, monthLong, prevYear, year } from "../../helpers/constant";
import { useDispatch, useSelector } from "react-redux";
import { getAnalytics } from "../../store/sales/slice";
import Loader from "../../components/Loader";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="relative flex justify-center items-center bg-white p-4 shadow-md">
      <FontAwesomeIcon
        icon={faAngleLeft}
        className="absolute text-blue w-6 h-6 left-2"
        onClick={() => navigate("/")}
      />
      <p className="text-black font-semibold text-lg">Sales analytics</p>
      <p></p>
    </div>
  );
};

const Sales = () => {
  const dispatch = useDispatch();

  const { data, status } = useSelector((store) => store.sales);

  useEffect(() => {
    dispatch(getAnalytics());
  }, [dispatch]);

  const series = data.map((item, key) => {
    return {
      name: key ? prevYear : year,
      data: Object.values(item).map((e) => {
        return Math.floor(e);
      }),
    };
  });

  const first = series[0]?.data[month];

  const second = series[1]?.data[month];

  const diff = second - first;

  return (
    <>
      <Header />
      {status === "loading" ? (
        <Loader />
      ) : (
        <div>
          <div className="space-y-2">
            <div className="flex justify-around items-center mt-6">
              <p className="border-t w-[25%] border-blue" />
              <p className="text-blue font-semibold text-xl whitespace-nowrap">
                Sales Report
              </p>
              <p className="border-t w-[25%] border-blue" />
            </div>
            <p className="text-darkGray text-center text-sm">
              user ({prevYear}-{year})
            </p>
          </div>
          <div className="overflow-auto">
            <Chart series={series} />
          </div>

          <div className="rounded bg-white text-darkGray drop-shadow-lg p-2 m-3 font-semibold">
            <div className="flex justify-between items-center my-3">
              <p className="text-xl">Sales Info</p>
              <div className="flex space-x-2 text-[12px] items-center">
                <div className="w-6 h-6 bg-[#1E81B0] rounded" />
                <p>{prevYear}</p>
                <div className="w-6 h-6 bg-[#E28743] rounded" />
                <p>{year}</p>
              </div>
            </div>

            <div className="rounded border border-blue m-3">
              <p className="text-blue font-semibold p-2 text-center border-b border-blue">
                Monthly Sales
              </p>
              <div className="grid grid-flow-col font-normal">
                <div className="border-r border-blue px-2 py-4 space-y-1">
                  <p className="font-semibold">
                    {monthLong} ({prevYear})
                  </p>
                  <p>$ {first}</p>
                </div>
                <div className="px-2 py-4 space-y-1">
                  <p className="font-semibold">
                    {monthLong} ({year})
                  </p>
                  <p>$ {second}</p>
                  <p className="text-green">+ $ {diff}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sales;
