import { configureStore } from '@reduxjs/toolkit';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import authReducer from './auth/slice'; // auth reducer
import dashboardReducer from './dashboard/slice'; // dashboard reducer
import salesReducer from './sales/slice'; // sales reducer
import itemsReducer from './items/slice'; // items reducer
import invoiceReducer from './invoice/slice'; // invoice reducer
import customerReducer from './customer/slice'; // customer reducer
import documentsReducer from './documents/slice'; // document reducer
import pendingOrderReducer from './pending-orders/slice'; // pending orders reducer

const rootReducer = {
  auth: authReducer,
  dashboard: dashboardReducer,
  sales: salesReducer,
  items: itemsReducer,
  invoice: invoiceReducer,
  customer: customerReducer,
  pendingOrder: pendingOrderReducer,
  documents: documentsReducer
};
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
});
export default configureStore({
  reducer: rootReducer,
  middleware: customizedMiddleware
});
