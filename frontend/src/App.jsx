import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './components/session/LoginForm';
import SignUpForm from './components/session/SignUpForm';

import * as sessionActions from './store/session';
import UserView from './components/users/UserView';
import AudioPlayer from './components/audio/AudioPlayer';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreSession()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <AudioPlayer />
    </>
  );
}

const userLoader = async ({request, params}) => {
  const response = await fetch(`/api/users/${params.username}`);
  if(response.ok) {
    const data = await response.json();
    if(data.user) {
      
      return data.user
    } else throw data
  } 
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <h1>Welcome!</h1>
      },
      {
        path: "/login",
        element: <LoginForm />
      },
      {
        path: "/signup",
        element: <SignUpForm />
      },
      {
        path: '/:username',
        loader: userLoader,
        element: <UserView />,
        children: [

        ]
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
