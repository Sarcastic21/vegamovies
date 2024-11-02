import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import img10 from '../components/P1.png';
import { FaSearch } from 'react-icons/fa';
import './Styles/MoviesDetails.css';
import img11 from '../components/instagram-join-news-en-removebg-preview.png';

// Utility function to shuffle an array randomly
const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [relatedMovies, setRelatedMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const moviesPerPage = 6; // Number of movies to display per page
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);

    // Fetch movies data on component mount
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('https://vegamovies2-0.onrender.com/api/movies'); // Adjust URL to your API endpoint
                const data = await response.json();
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        fetchMovies();
    }, []);

    // Filter movies based on search term
    useEffect(() => {
        const filtered = movies.filter(movie =>
            movie.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMovies(filtered);
    }, [searchTerm, movies]);

    // Get the 5 most recent movies
    const recentMovies = movies
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
    // Fetch individual movie details
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`https://vegamovies2-0.onrender.com/api/movies/${id}`);
                const data = await response.json();
                setMovie(data);
                fetchRelatedMovies(data.category, data.platform); // Fetch related movies
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        };
        const fetchRelatedMovies = async (category, platform) => {
            try {
                const response = await fetch(`https://vegamovies2-0.onrender.com/api/movies`);
                const data = await response.json();
                const filtered = data.filter(
                    (m) => m.category === category && m.platform === platform && m._id !== id
                );
                const shuffled = shuffleArray(filtered); // Shuffle the filtered movies
                setRelatedMovies(shuffled);
            } catch (error) {
                console.error('Error fetching related movies:', error);
            }
        };
        fetchMovie();
    }, [id]);

    // Fetch related movies by category and platform
 

    if (!movie) return <div>Loading...</div>;

    const formattedDate = new Date(movie.createdAt).toLocaleDateString();

    // Function to handle the next button click
    const handleNext = () => {
        if (currentIndex + moviesPerPage < relatedMovies.length) {
            setCurrentIndex(currentIndex + moviesPerPage);
        }
    };

    // Function to handle the previous button click
    const handlePrevious = () => {
        if (currentIndex - moviesPerPage >= 0) {
            setCurrentIndex(currentIndex - moviesPerPage);
        }
    };

    // Determine the movies to display based on the current index
    const displayedMovies = relatedMovies.slice(currentIndex, currentIndex + moviesPerPage);

    return (
        <>
            <h1 className='logo'>
                <img
                    className='img10'
                    src={img10}
                    alt="Logo"
                    onError={(e) => { e.target.src = '/default-logo.jpg'; }}
                />
               
            </h1>
           
            <div className="nav-container">
            <div className="desktop-menu">
                <button className="nav-button" onClick={() => navigate('/')}>Home</button>
                <button className="nav-button" onClick={() => navigate('/movies')}>Movies</button>
                <button className="nav-button" onClick={() => navigate('/webseries')}>Web Series</button>
                <button className="nav-button" onClick={() => navigate('/netflix')}>Netflix</button>
                <button className="nav-button" onClick={() => navigate('/amazonprime')}>Amazon Prime</button>
                <button className="nav-button" onClick={() => navigate('/disney')}>Disney+</button>
                <button className="nav-button" onClick={() => navigate('/adult')}>Adult 18+</button>
            </div>

            <div className="mobile-menu">
                <div className="hamburger-icon" onClick={() => setShowMenu(!showMenu)}>
                    ☰ Menu
                </div>
                {showMenu && (
                    <div className="hamburger-menu">
                        <button className="nav-button" onClick={() => navigate('/')}>Home</button>
                        <button className="nav-button" onClick={() => navigate('/movies')}>Movies</button>
                        <button className="nav-button" onClick={() => navigate('/webseries')}>Web Series</button>
                        <button className="nav-button" onClick={() => navigate('/netflix')}>Netflix</button>
                        <button className="nav-button" onClick={() => navigate('/amazonprime')}>Amazon Prime</button>
                        <button className="nav-button" onClick={() => navigate('/disney')}>Disney+</button>
                        <button className="nav-button" onClick={() => navigate('/adult')}>Adult 18+</button>
                    </div>
                )}
            </div>
        </div>

        <div className="user-page">
            

            {/* Buttons to navigate between UserPage, Movies, and WebSeries */}
            <div className='nav-buttons2'>
                <button className='nav-button3' onClick={() => navigate('/')}>Home</button>
                <button className='nav-button4' onClick={() => navigate('/movies')}>Movies</button>
                <button className='nav-button5' onClick={() => navigate('/webseries')}>Web Series</button>
            </div>

            <div className="nav-buttons">
                <button className='nav-button1' onClick={() => navigate('/anime')}>Anime</button>
                <button className='nav-button1' onClick={() => navigate('/netflix')}>Netflix</button>
                <button className='nav-button1' onClick={() => navigate('/disney')}>Disney+</button>
                <button className='nav-button1' onClick={() => navigate('/amazonprime')}>Amazon Prime</button>
                <button className='nav-button1' onClick={() => navigate('/mxplayer')}>MxPlayer</button>
                <button className='nav-button1' onClick={() => navigate('/Kdrama')}>K-Drama</button>
                <button className='nav-button1' onClick={() => navigate('/adult')}>Adult</button>
            </div>

            {/* Search bar */}
            <div className="search-container">
            <input
    type="text"
    id="search1"                 // Added id attribute
    name="search1"               // Added name attribute
    placeholder="What are you looking for?"
    className="search-bar1"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    autoComplete="off"          // Optional: turn off autocomplete
/>

            <button className="search-button">
                <span role="img" aria-label="search-icon">        <FaSearch size={20} /></span>
            </button>
        </div>
            <hr className='hr' />
            <div className="alert">
  <span className="closebtn" >x</span>
  Simply <strong>Comment on Post</strong> if you found any Broken Link; we will fix it for you within the next 24 Hours with Guaranteed and Great Support.
</div>
</div>
            <hr className='hr' />

            <div  className='Container'>
                <div className='Container1'>
                <h1>{movie.name}</h1>
            <div className='Container3' >
                <img src={movie.image} alt={movie.name} className='MovieImage1' />
                
                </div>
                <div >
              
                    <p>{movie.description}</p>
                    <p >Published on: {formattedDate}</p>
                    
                    <p>Category: {movie.category}</p>
                    <p>Platform: {movie.platform}</p>
                    <p> Director/Writer: N/A</p>
                    <h2 >Series-SYNOPSIS/PLOT:</h2>
                    <p>{movie.description2}</p>
                    <h2 >Screenshots: (Must See Before Downloading)…</h2>
                    <img src={movie.image2} alt={movie.name} className="movie-image3" />
                    <img src={movie.image3} alt={movie.name} className="movie-image3" />
                    <hr  />

                    <img src={movie.image4} alt={movie.name} className="movie-image3" />
                    <img src={movie.image5} alt={movie.name} className="movie-image3" />

                    <h3 className='D1'>Download zip  file of movies &  webseries ...</h3>

                    <h1 >Download Link :</h1>
                    <h2 className='D2' >{movie.filesize}</h2>
                    <div className='Download-button'>
    {/* Render buttons for downloading each season if it exists */}
    {movie.category === 'webseries' && movie.seasons.map((seasonLink, index) => (
        seasonLink ? ( // Check if the season link is valid
            <button 
                key={index} 
                onClick={() => window.open(seasonLink)} // Directly open the season link
                className='Download-Button1'>
                Download Season {index + 1}
            </button>
        ) : null
    ))}

    {/* Download button for movies */}
    {movie.category !== 'webseries' && movie.link && (
        <div className='Download-button'>
            <button 
                onClick={() => window.open(movie.link)} // Directly open the movie link
                className='Download-Button1'>
                Download
            </button>
        </div>
    )}
</div>

            <hr/>
                <h3 className='D1' >Winding Up ❤️</h3>
                <p>Thank You For Visiting Vegamovies The Prefect Spot For HD Dual Audio (Hindi-English) Movies & TV Series Download. So Please Keep Downloading & Keep Sharing. Enjoy!</p>
                </div>
                <h4 >More -</h4>
            <div className="movie-grid">
                {displayedMovies.length > 0 ? (
                    displayedMovies.map((related) => (
                        <Link to={`/movies/${related._id}`} key={related._id} className="movie-card">
                            <img
                                src={related.image}
                                alt={related.name}
                                className="movie-image"
                                onError={(e) => { e.target.src = '/default-movie.jpg'; }}
                            />
                             <p className="published-date2"> 
                                {new Date(movie.createdAt).toLocaleDateString()}
                            </p>
                            <h5 >{related.name}</h5>
                        </Link>
                    ))
                ) : (
                    <p>No related movies found.</p>
                )}
            </div>

            <div className='D2'>
                <button onClick={handlePrevious} disabled={currentIndex === 0}>Previous</button>
                <button onClick={handleNext} disabled={currentIndex + moviesPerPage >= relatedMovies.length}>Next</button>
            </div>
            </div>
            <div className="search-and-recent-container">
            {/* Search Bar */}
            <input
    type="text"
    id="search"                 // Added id attribute
    name="search"               // Added name attribute
    placeholder="What are you looking for?"
    className="search-bar1"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    autoComplete="off"          // Optional: turn off autocomplete
/>


            {/* Filtered Movie Results */}
            {searchTerm && (
                <div className="search-results">
                    {filteredMovies.map((movie) => (
                        <Link
                            to={`/movies/${movie._id}`}
                            key={movie._id}
                            className="search-result-item"
                        >
                            {movie.name}
                        </Link>
                    ))}
                </div>
            )}

            {/* Recent Uploads Section */}
            <div className="recent-uploads">
                <h1>
                    <img className="contact" src={img11} alt="Logo" />
                </h1>
                <h4>Recent Uploads</h4>
                <ul>
                    {recentMovies.map((movie) => (
                        <li key={movie._id}>
                            <Link to={`/movies/${movie._id}`}>
                                {movie.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
       


            <h4>Tags</h4>
            <hr></hr>
               <div className="nav-buttonsss">
                <button className='nav-button10' onClick={() => navigate('/anime')}>Anime</button>
                <button className='nav-button10' onClick={() => navigate('/netflix')}>Netflix</button>
                <button className='nav-button10' onClick={() => navigate('/disney')}>Disney+</button>
                <button className='nav-button10' onClick={() => navigate('/amazonprime')}>Amazon Prime</button>
                <button className='nav-button10' onClick={() => navigate('/mxplayer')}>MxPlayer</button>
                <button className='nav-button10' onClick={() => navigate('/Kdrama')}>K-Drama</button>
                <button className='nav-button10' onClick={() => navigate('/adult')}>Adult</button>
            </div>
            
            </div>
            </div>


            

            <footer className="footer">
                <div className="footer-content">
                    <p>Copyright &copy; 2024. Created by Vega Movies Team</p>
                    <hr className="footer-line" />
                    <p><span className="dot-text">Vega</span> Movies</p>
                    
                    <p>Contact us: <a href='vegamovies.com' >Vegamovies@gmail.com</a></p>
                </div>
            </footer>
        </>
    );
};

export default MovieDetail;
