import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img10 from '../components/P1.png';
import { FaSearch } from 'react-icons/fa';

const AmazonPrimePage= () => {
    const [movies, setAmazonContent] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // Add state for current page
    const moviesPerPage = 24; // Number of movies to display per page
    const navigate = useNavigate(); // For navigation
    const [isLoading, setIsLoading] = useState(true); // New state for loading spinner
    const [error, setError] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
   
    
    // Fetch movies from the backend
    useEffect(() => {
        const fetchAmazonContent = async () => {
            setIsLoading(true); // Show loading spinner
            setError(null); // Reset error state
            try {
                console.log("API Base URL:", process.env.REACT_APP_API_BASE_URL);

                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/movies`);

                // Check if the response is OK
                if (!response.ok) {
                    const errorData = await response.json(); // Attempt to read the error response
                    throw new Error(errorData.message || "Failed to fetch Amazon Prime content");
                }

                const data = await response.json(); // Parse the response only if the status is OK
                
                // Filter and reverse for Amazon Prime content
                const AmazonOnly = data
                    .filter((movie) => movie.platform === "AmazonPrime")
                    .reverse(); // Reverse to show latest first

                setAmazonContent(AmazonOnly);
            } catch (error) {
                console.error("Error fetching Amazon Prime content:", error);
                setError(error.message); // Set error state for UI feedback
            } finally {
                setIsLoading(false); // Hide loading spinner
            }
        };

        fetchAmazonContent();
    }, []);
   
   
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setCurrentPage(1); // Reset to first page on Enter key press
            event.target.blur(); // Blur the input to close the keyboard on mobile
        }
    };

    const filteredMovies = movies.filter(movie => {
        // Normalize movie name by removing spaces and non-alphanumeric characters
        const normalizedMovieName = movie.name.toLowerCase().replace(/[^a-z0-9]/gi, '');
        
        // Normalize the search term in the same way
        const normalizedSearchTerm = searchTerm.toLowerCase().replace(/[^a-z0-9]/gi, '');
    
        // Compare the normalized movie name with the normalized search term
        return normalizedMovieName.includes(normalizedSearchTerm);
    });

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
                    <button className="nav-button" onClick={() => navigate('/hollywood')}>Hollywood</button>
                    <button className="nav-button" onClick={() => navigate('/bollywood')}>Bollywood</button>
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
                            <button className="nav-button" onClick={() => navigate('/hollywood')}>Hollywood</button>
                            <button className="nav-button" onClick={() => navigate('/bollywood')}>Bollywood</button>
                        </div>
                    )}
                </div>
            </div>

            <div className="user-page">
                <div className='nav-buttons2'>
                <button className='nav-button3' onClick={() => navigate('/')}>Dual Audio </button>
                <button className='nav-button4' onClick={() => navigate('/movies')}>Movies</button>
                    <button className='nav-button5' onClick={() => navigate('/webseries')}>Web Series</button>
                </div>
                <div className="nav-buttons-container">
    <button className="nav-button6" onClick={() => navigate('/hollywood')}>Hollywood</button>
    <button className="nav-button6" onClick={() => navigate('/bollywood')}>Bollywood</button>
</div>
<div className="nav-buttons">
                    <button className='nav-button1' onClick={() => navigate('/anime')}>Anime</button>
                    <button className='nav-button1' onClick={() => navigate('/netflix')}>Netflix</button>
                    <button className='nav-button1' onClick={() => navigate('/disney')}>Disney+</button>
                    <button className='nav-button1' onClick={() => navigate('/amazonprime')}>Amazon Prime</button>
                    <button className='nav-button1' onClick={() => navigate('/adult')}>Adult</button>

                    <button className='nav-button1' onClick={() => navigate('/mxplayer')}>MxPlayer</button>
                    <button className='nav-button1' onClick={() => navigate('/Kdrama')}>K-Drama</button>
                    <button className='nav-button1' onClick={() => navigate('/hollywood')}>Hollywood</button>
                    <button className='nav-button1' onClick={() => navigate('/bollywood')}>Bollywood</button>
                </div>
            {/* Search bar */}
            <div className="search-container">
           <input
                type="text"
                placeholder="What are you looking for?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress} // Listen for Enter key press
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
            <h1 className='C-1'>Amazon Prime </h1>

            {/* Movie Grid */}
            {isLoading ? (
                    <div className="spinner-container">
                        <div className="spinner"></div>
                        <p>Loading movies...</p>
                    </div>                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <div className="movie-grid">
                        {currentMovies.length > 0 ? (
                            currentMovies.map(movie => (
                                <Link to={`/movies/${movie._id}`} key={movie._id} className="movie-card">
                                    <img
                                        src={movie.image}
                                        alt={movie.name}
                                        className="movie-image"
                                        onError={(e) => {
                                            e.target.src = '/default-movie.jpg';
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
                            <p className="no-movies-message">No movies found.</p>
                        )}
                    </div>
                )}

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

                    <p>Contact us: <a className='href' href='mailto:Vegamovies@gmail.com'>Vegamovies@gmail.com</a></p>
                </div>
            </footer>
        </>
    );
};

export default AmazonPrimePage;
