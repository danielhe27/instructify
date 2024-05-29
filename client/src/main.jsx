import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//importing from pages index.js
import { 
  Home, 
  Dashboard,
  SingleTutorial,
  All,
  TutorialCategories,
  ViewTutorial} from './pages';

//importing from components index.js
import { 
  VideoSearch, 
  Login, Signup, 
  Tutorial, About } from './components';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index : true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path:'signup', element: <Signup /> },
      { path: 'videosearch', element: <VideoSearch /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'tutorial', element: <Tutorial /> },
      { path: 'categories', element: <TutorialCategories /> },
      { path: '/categories/view-tutorial', element: <ViewTutorial /> },
      { path: 'tutorial/:id', element: <SingleTutorial /> },
      { path: 'about', element: <About /> },
      { path: 'all', element: <All /> }    
],
  },
]);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
