import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './App.css';
import Add from './components/addflight/Add';
import Flight from "./components/getflight/Flight";
import Edit from "./components/updateflight/Edit"
function App() {
  const route = createBrowserRouter([

    {
      path : "/add",
      element : <Add />,
    },
    {
      path : "/",
      element : <Flight />,
    },
    {
      path : "/edit/:id",
      element : <Edit />,
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
      
    </div>
  );
}

export default App;
