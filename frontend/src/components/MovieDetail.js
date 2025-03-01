import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import img10 from '../components/P1.png';
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
   
   const [email, setEmail] = useState('');
  const [Comments, setComments] = useState(''); // Separate state for comments
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [messageColor, setMessageColor] = useState(""); // State for message color
  const [message, setMessage] = useState(""); // State for custom message

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure the email and comment are being set correctly
    console.log('Email:', email);
    console.log('Comments:', Comments);
  
    const formData = new FormData();
    formData.append('email', email);
    formData.append('Comments', Comments);
  
    setIsLoading(true); // Set loading to true
    try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/send-email`, {
            method: 'POST',
            body: formData,
        });
        
        
    
  
      if (response.ok) {
        setMessage("Comment sent successfully!"); // Set success message
        setMessageColor("green"); // Set the color to green
      } else {
        setMessage("Failed to send Comment. Please try again."); // Set failure message
        setMessageColor("red"); // Set the color to red
      }

      // Reset form fields
      setEmail("");
      setComments("");

      // Hide message after 1 second
      setTimeout(() => {
        setMessage(""); // Clear the message after 1 second
      }, 1000);
    } catch (error) {
      console.error("Error sending email:", error);
      setMessage("An error occurred. Please try again later."); // Error message
      setMessageColor("red"); // Set the color to red
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };
    // Fetch movies data on component mount
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/movies`); // Use the environment variable
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`); // Check for errors
                }
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
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setMovie(data);
                fetchRelatedMovies(data.category, data.platform); // Fetch related movies
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        };
    
        const fetchRelatedMovies = async (category, platform) => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/movies`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
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
 

  if (!movie) {
        return (
            <div className="spinner-container">
            <div className="spinner"></div>
            <p>Loading movies...</p>
        </div> 
        );
    }
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
            <div className="search-and-recent-container">

            {/* Search Bar */}
            <input
    type="text"
    id="search"
    name="search"
    placeholder="⌕ What are you looking for?"
    className="search-bar1"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    autoComplete="off"
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
                <h1 className='Movie-Name'>{movie.name}</h1>
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
                    <h2 className='D2'>{movie.filesize}</h2>
<div className='Download-button'>
    {/* Render buttons for downloading each season if it exists for 720p */}
    {movie.category === 'webseries' && movie.seasons720p.map((seasonLink720p, index) => (
        seasonLink720p && ( // Check if the season link is valid
            <button 
                key={index} 
                onClick={() => window.open(seasonLink720p)} // Directly open the season link
                className='Download-Button1'>
                Download Season {index + 1} 720p
            </button>
        )
    ))}

    {/* Download button for movies or seasons720p for webseries */}
    {movie.category !== 'webseries' && movie.link720p && (
        <button 
            onClick={() => window.open(movie.link720p)} // Directly open the movie link
            className='Download-Button1'>
            Download 720p
        </button>
    )}
</div>

{/* Only render if filesize2 exists */}
{movie.filesize2 && <h2 className='D2'>{movie.filesize2}</h2>}

<div className='Download-button'>
    {/* Render buttons for downloading each season if it exists for 1080p */}
    {movie.category === 'webseries' && movie.seasons1080p.map((seasonLink1080p, index) => (
        seasonLink1080p && ( // Check if the season link is valid
            <button 
                key={index} 
                onClick={() => window.open(seasonLink1080p)} // Directly open the season link
                className='Download-Button1'>
                Download Season {index + 1} 1080p
            </button>
        )
    ))}

    {/* Download button for movies or seasons1080p for webseries */}
    {movie.category !== 'webseries' && movie.link1080p && (
        <button 
            onClick={() => window.open(movie.link1080p)} // Directly open the movie link
            className='Download-Button1'>
            Download 1080p
        </button>
    )}
</div>

            <hr/>
                <h3 className='D1' >Winding Up ❤️</h3>
                <p>Thank You For Visiting Vegamovies The Prefect Spot For HD Dual Audio (Hindi-English) Movies & TV Series Download. So Please Keep Downloading & Keep Sharing. Enjoy!</p>
                </div>
                <h4 >More-</h4>
                <div className="movie-grid">
    {displayedMovies.length > 0 ? (
        displayedMovies.map((related) => (
            <Link
                to={`/movies/${related._id}`}
                key={related._id}
                className="movie-card"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <img
                    src={related.image}
                    alt={related.name}
                    className="movie-image"
                    onError={(e) => { e.target.src = '/default-movie.jpg'; }}
                />
                <p className="published-date2"> 
                    {new Date(related.createdAt).toLocaleDateString()}
                </p>
                <h5>{related.name}</h5>
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
                <button className="nav-button10" onClick={() => navigate('/hollywood')}>Hollywood</button>
                <button className="nav-button10" onClick={() => navigate('/bollywood')}>Bollywood</button>
                <button className='nav-button10' onClick={() => navigate('/mxplayer')}>MxPlayer</button>
                <button className='nav-button10' onClick={() => navigate('/Kdrama')}>K-Drama</button>
                <button className='nav-button10' onClick={() => navigate('/adult')}>Adult</button>
            </div>
            <div>
            <hr></hr>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Enter your E-mail'
          />
          <textarea
            value={Comments}
            onChange={(e) => setComments(e.target.value)} // Set the comments
            required
            placeholder='Write movie/webseries name '
          />
        </div>
        <button className="submit-button" type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Submit'}
        </button>
      </form>
      <h3 className='last'>Simply comment  movie/webseries name if you found link broken we will fix that within 24hr for you  </h3>

      {/* Show custom message */}
      {message && (
        <div
          style={{
            backgroundColor: messageColor,
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            marginTop: "10px",
            textAlign: "center",
          }}
        >
          {message}
        </div>
      )}
    </div>
          
              
      </div>
            </div>


            

            <footer className="footer">
                <div className="footer-content">
                    <p>Copyright &copy; 2024. Created by Vega Movies Team</p>
                    <hr className="footer-line" />
                    <p><span className="dot-text">Vega</span> Movies</p>
                    
                    <p>Contact us: <a className='href' href='mailto:Vegamovies@gmail.com'>Vegamovies@gmail.com</a></p>
                </div>
            </footer>
        </>
    );
};

export default MovieDetail;
