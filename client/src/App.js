import './App.css';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Detail from './components/Detail/Detail';
import { Routes, Route, useLocation} from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import Form from './components/Form/Form'

function App() {
  const [recipes, setRecipes] = useState([])
  const {pathname} = useLocation();


  async function onSearch(name) {
    let URL = "";
    if (!name) {
      URL = 'http://localhost:3001/recipes'
    } else {
      URL = `http://localhost:3001/recipes?nombre=${name}`
    }

    
    try {
      const {data} = await axios(URL)
        console.log(data);
      if (data.length > 0) {
          setRecipes(data);
        } else {
          alert("¡No hay recetas con este NOMBRE!");
        }
    } catch (error) {
      console.log(error)
    }
      }


  return (
    <div className="App">
    {pathname !== '/' && <NavBar onSearch={onSearch} />}

      <Routes>
      <Route path="/" element={<Landing/>}></Route>
      <Route path="/home" element={<Home recipes={recipes} onSearch={onSearch}/>}></Route>
      <Route path="/form" element={<Form/>}></Route>
      <Route path="/detail/:id" element={<Detail/>} ></Route>
      </Routes>


    </div>
  );
}

export default App;
