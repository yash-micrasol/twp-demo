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
    case 'ready_to_pick':
      return (
        <p className="border border-black bg-white w-7 h-7 flex justify-center items-center font-bold rounded-full">
          R
        </p>
      );
    case 'partially_picked':
      return (
        <p className="border border-black bg-yellow w-7 h-7 flex justify-center items-center font-bold rounded-full">
          P
        </p>
      );
    case 'fully_picked':
      return (
        <p className="border border-black bg-green w-7 h-7 flex justify-center items-center font-bold rounded-full">
          F
        </p>
      );
    case 'delivered':
      return (
        <p className="border border-black bg-indigo-400 w-7 h-7 flex justify-center items-center font-bold rounded-full">
          D
        </p>
      );
    default:
      return '';
  }
};

export const formatDate = (e) => {
  return new Date(e).toLocaleDateString('en-us', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  });
};
