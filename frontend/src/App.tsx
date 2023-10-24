import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import { Navbar } from './components/Navbar';
import { Container } from 'react-bootstrap';

function App() {

  return (
    <div className='body'>
      <ShoppingCartProvider>
      <Navbar />
        <Container className="mb-4">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
        </Container>
    </ShoppingCartProvider>  
    </div>
  )
}

export default App
