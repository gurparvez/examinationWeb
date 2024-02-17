import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login, Home, Courses, Examination, Page1, Profile, Page2, Page3 } from './layouts';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store';
import { api } from './constants';
import axios from 'axios';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/home',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'courses',
        element: <Courses />,
      },
      {
        path: 'examination',
        element: <Examination />,
        loader: async () => {
          const url = api.formLive;
          try {
            const response = (await axios.get(url)).data;
            return response.data;
          } catch (error) {
            return null
          }
        },
      },
      {
        path: 'page1',
        element: <Page1 />,
      },
      {
        path: 'page2',
        element: <Page2 />,
      },
      {
        path: 'page3',
        element: <Page3 />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
