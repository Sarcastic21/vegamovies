import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img10 from '../components/P1.png';
import { FaSearch } from 'react-icons/fa';

const HollywoodPage = () => {
  const [movies, setHollywoodContent] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 24;
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true); // New state for loading spinner
    const [error, setError] = useState(null);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const fetchHollywoodContent = async () => {
            setIsLoading(true); // Show loading spinner
            setError(null); // Reset error state
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/movies`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                // Filter for Hollywood content and reverse to show the latest first
                const hollywoodOnly = data.filter((movie) => movie.industry === "hollywood");
                setHollywoodContent(hollywoodOnly.reverse());
            } catch (error) {
                console.error("Error fetching Hollywood content:", error);
                setError("Failed to fetch Hollywood content. Please try again later.");
            } finally {
                setIsLoading(false); // Hide loading spinner
            }
        };

        fetchHollywoodContent();
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


    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

    const nextPage = () => {
        if (indexOfLastMovie < filteredMovies.length) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

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
                        <FaSearch size={20} />
                    </button>
                </div>

                <hr className='hr' />
                
            <div className="alert">
  <span className="closebtn">x</span>
  Simply <strong>Comment on Post</strong> if you found any Broken Link; we will fix it for you within the next 24 Hours with Guaranteed and Great Support.
</div>
                <h1 className='C-1'>Hollywood Movies</h1>

                
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

                <div className="pagination-controls">
                    {currentPage > 1 && <button onClick={prevPage}>Previous Page</button>}
                    {indexOfLastMovie < filteredMovies.length && <button onClick={nextPage}>Next Page</button>}
                </div>
            </div>

            <footer className="footer">
                <div className="footer-content">
                    <p>Copyright &copy; 2024. Created by Vega Movies Team</p>
                    <hr className="footer-line" />
                    <p><span className="dot-text">Vega</span> Movies</p>
                    <p onClick={() => navigate('/privacy')}>Privacy</p>
                    <p>Contact us: <a className='href' href='mailto:Vegamovies@gmail.com'>Vegamovies@gmail.com</a></p>
                </div>
            </footer>
        </>
    );
};

export default HollywoodPage;
