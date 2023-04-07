import './App.css';
import Drawer from "./Components/Drawer"
import { Routes,Route } from 'react-router-dom';
import SinglePage from './Components/SinglePage';
import Error from './Components/Error';

function App() {
  return (
    <>
    <Routes>
      <Route exact path='/' element={<Drawer
      ></Drawer>}></Route>
<Route path='watch/:id' element={<SinglePage></SinglePage>}></Route>
<Route path='/error' element={<Error></Error>}></Route>
   </Routes>
   </>
  );
}

export default App;
