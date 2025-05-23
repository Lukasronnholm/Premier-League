import Home from './pages/Home'
import Players from './pages/Players'
import MyTeam from './pages/MyTeam.tsx'
import Teaminfo from './pages/TeamInfo.tsx'
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
        { element: <Players />, path: '/players' },
        {element: <MyTeam />, path: '/my-team'},
        {element: <Teaminfo />, path: '/:id'}



     


      
      ],
    }
  ])

  return <RouterProvider router={router} />
}

export default App