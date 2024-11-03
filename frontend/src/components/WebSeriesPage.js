import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img10 from '../components/P1.png';
import { FaSearch } from 'react-icons/fa';

const WebSeriesPage= () => {
    const [movies, setWebSeries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // Add state for current page
    const moviesPerPage = 24; // Number of movies to display per page
    const navigate = useNavigate(); // For navigation

    const [showMenu, setShowMenu] = useState(false);
   
    
    // Fetch movies from the backend
    useEffect(() => {
        const fetchWebSeries = async () => {
            try {
                // Debugging the API base URL
                console.log('API Base URL:', process.env.REACT_APP_API_BASE_URL);
    
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/movies`);
                const data = await response.json();
                const seriesOnly = data
                    .filter(movie => movie.category === 'webseries')
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by latest
                
                setWebSeries(seriesOnly);
            } catch (error) {
                console.error('Error fetching web series:', error);
            }
        };
        
        fetchWebSeries();
    }, []);
    

    // Filter movies based on search term
    const filteredMovies = movies.filter(movie =>
        movie.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate the movies to display on the current page
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

    // Function to go to the next page
    const nextPage = () => {
        if (indexOfLastMovie < filteredMovies.length) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    // Function to go to the previous page (if needed)
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

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
                placeholder="What are you looking for?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />
            <button className="search-button">
                <span role="img" aria-label="search-icon">        <FaSearch size={20} /></span>
            </button>
        </div>
            <hr className='hr' />
            <div className="alert">
  <span className="closebtn">x</span>
  Simply <strong>Comment on Post</strong> if you found any Broken Link; we will fix it for you within the next 24 Hours with Guaranteed and Great Support.
</div>
            <h1 className='C-1'>WEB-SERIES</h1>

            {/* Movie Grid */}
            <div className="movie-grid">
                {currentMovies.length > 0 ? (
                    currentMovies.map(movie => (
                        <Link to={`/movies/${movie._id}`} key={movie._id} className="movie-card">
                           
                            <img
                                src={movie.image}
                                alt={movie.name}
                                className="movie-image"
                                onError={(e) => {
                                    e.target.src = '/default-movie.jpg'; // Default fallback image
                                    e.target.alt = "Default Movie Image";
                                }}
                            />
                             <p className="published-date2"> 
                                {new Date(movie.createdAt).toLocaleDateString()}
                            </p>
                            <h5 className='Movie-name121'>{movie.name}</h5>
                        </Link>
                    ))
                ) : (
                    <p>No movies found.</p>
                )}
            </div>

            {/* Pagination Controls */}
            <div className="pagination-controls">
                {currentPage > 1 && <button onClick={prevPage}>Previous Page</button>}
                {indexOfLastMovie < filteredMovies.length && <button onClick={nextPage}>Next Page</button>}
            </div>
            <p style={{ color: 'grey' }}>
  TheVegamovies, Vegamovies, and Vegamovie are among India's top websites for free download of Hollywood movies in Hindi-dubbed versions, as well as Bollywood full movies 2023.
  
  On TheVegamovies.com, Vegamovies.com, and Vegamovie.com, you can find information about upcoming movies and download the latest Bollywood and Hollywood dubbed movies in dual languages.
  <br /><br />
  Our website offers a wide selection of movies to watch online or download without any cost. We provide various formats, including MP4 and MKV, with high-definition options like 4K Ultra HD, 1080p, 720p, and 480p mobile HD quality in small file sizes.
  
  TheVegamovies Com, VegaMovies Com, and Vegamovie Com deliver a smooth movie download experience, with high-speed, unlimited Gbps servers. Newly released movies in HD are available on TheVegamovies, VegaMovies, and Vegamovie within minutes of release.
  
  Fans of South Indian Hindi-dubbed movies will be pleased to know that our website also hosts dubbed versions of popular South Indian movies on TheVegamovies, Vegamovies, and Vegamovie.
</p>


            
        </div>
        <footer className="footer">
                <div className="footer-content">
                    <p>Copyright &copy; 2024. Created by Vega Movies Team</p>
                    <hr className="footer-line" />
                    <p><span className="dot-text">Vega</span> Movies</p>
                    <p  onClick={() => navigate('/privacy')}>Privacy</p>

                    <p>Contact us: <a href='vegamovies.com' >Vegamovies@gmail.com</a></p>
                </div>
            </footer>
        </>
    );
};

export default WebSeriesPage;
