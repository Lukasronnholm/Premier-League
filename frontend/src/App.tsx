import Home from './pages/Home'

import './App.css'



import {
  createHashRouter,
  Outlet,
  RouterProvider
} from 'react-router-dom'

function App() {
  const router = createHashRouter([
    { path: '/',
      element: (
        <>
       
          <main>
            <Outlet />
          </main>
  
        </>
      ),
        children: [
     
        { element: <Home />, path: '/' },

     


      
      ],
    }
  ])

  return <RouterProvider router={router} />
}

export default App