import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RootMenu from './components/RootMenu/RootMenu';
import Home from './DemoPuzzle';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootMenu />,
  },
  {
    path: "/DemoPuzzle",
    element: <Home />,
  }
]);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RouterProvider router={router} />
      </header>
    </div>
  );
}

export default App;