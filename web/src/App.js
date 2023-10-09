import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { Routers } from './Router/Routers';
import AOS from 'aos'
import 'aos/dist/aos.css';

function App() {
  const router = Routers;
  AOS.init({
    duration: 600,
    easing: 'ease-in-sine',
  });
  return (
    <div>
      <RouterProvider router={router}>
      </RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
