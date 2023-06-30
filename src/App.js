import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header'
import Trailer from './components/trailer/Trailer';
//@ts-ignore
import Reviews from './components/reviews/Reviews';

function App() {

  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState();

  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");

      setMovies(response.data);

    } catch (error) {
      console.log( error);
    }
  }

  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movie/${movieId}`);
      const singleMovie = response.data;

      setMovie(singleMovie);
      setReviews(singleMovie.reviewIds);
    
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMovies()
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element= { <Layout /> }>
          { /* props being passed as an argument */ }
          <Route path='/' element= { <Home movies= {movies}/> }> </Route>
          { /* Property(prop) passed via routing path */ }
          <Route path='/Trailer/:ytTrailerId' element={ <Trailer /> }> </Route>
          <Route path='/Reviews/:movieId' element ={<Reviews  getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews}/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;