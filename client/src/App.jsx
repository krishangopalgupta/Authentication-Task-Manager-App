import TaskList from './components/mainComponent/Tasks'
import Signup from './components/mainComponent/Signup'
import Login from './components/mainComponent/Login'


import {BrowserRouter, Routes, Route} from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<Signup/>}></Route>

        {/* // Login Route  */}
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/tasks' element={<TaskList/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App