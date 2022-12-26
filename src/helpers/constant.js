import { useLocation, useNavigate } from "react-router-dom";

const date = new Date();

export const monthArr = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC'
];

export const month = date.getMonth();
export const monthLong = date.toLocaleString('default', { month: 'long' });
export const monthShort = date.toLocaleString('default', { month: 'short' });

export const year = date.getFullYear();
export const prevYear = year - 1;

export const getStatus = (type) => {
  switch (type) {
    case "ready_to_pick":
      return (
        <p className="flex items-center justify-center font-bold bg-white border border-black rounded-full w-7 h-7">
          R
        </p>
      );
    case "partially_picked":
      return (
        <p className="flex items-center justify-center font-bold border border-black rounded-full bg-yellow w-7 h-7">
          P
        </p>
      );
    case "fully_picked":
      return (
        <p className="flex items-center justify-center font-bold border border-black rounded-full bg-green w-7 h-7">
          F
        </p>
      );
    case "delivered":
      return (
        <p className="flex items-center justify-center font-bold bg-indigo-400 border border-black rounded-full w-7 h-7">
          D
        </p>
      );
    default:
      return "";
  }
};

export const formatDate = (e) => {
  return new Date(e).toLocaleDateString('en-us', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  });
};

export const GetRoute = () => {
  const { pathname } = useLocation();
  let routeArr = pathname.split("/").slice(0, -1);
  let route = routeArr.length === 1 ? "/" : routeArr.join("/");
  return route;
};
