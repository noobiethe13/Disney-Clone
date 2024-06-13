import './App.css'
import GenreMovieList from './components/GenreMovieList'
import Header from './components/Header'
import ProductionTile from './components/ProductionTiles'
import Slider from './components/Slider'

function App() {

  return (
    <>
      <div>
        <Header/>

        <Slider/>
        
        <ProductionTile/>

        <GenreMovieList/>
      </div>
    </>
  )
}

export default App
