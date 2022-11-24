import { RouterProvider } from 'react-router-dom';
import './App.css';
import { Routers } from './Router/Routers';

function App() {
  const router = Routers;
  return (
    <RouterProvider router={router}>

    </RouterProvider>
  );
}

export default App;
