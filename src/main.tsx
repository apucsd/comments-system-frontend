import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import router from './routes/route';

import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
      <StrictMode>
            <Provider store={store}>
                  <PersistGate loading={null} persistor={persistor}>
                        <RouterProvider router={router} />
                        <div>
                              <Toaster />
                        </div>
                  </PersistGate>
            </Provider>
      </StrictMode>
);
