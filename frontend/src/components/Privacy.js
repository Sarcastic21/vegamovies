import React, {  useState } from 'react';
import {  useNavigate  } from 'react-router-dom';
import img10 from '../components/P1.png';
import { FaSearch } from 'react-icons/fa';
import './Styles/MoviesDetails.css';

// Utility function to shuffle an array randomly


const Privacy = () => {
    // Number of movies to display per page
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch movies data on component mount
 

    // Filter movies based on search term
    

    // Get the 5 most recent movies
    
   

    // Fetch related movies by category and platform
  

    // Function to handle the next button click
  

    // Determine the movies to display based on the current index

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
                <button className="nav-button" onClick={() => navigate('/disneyplus')}>Disney+</button>
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
                <button className="nav-button" onClick={() => navigate('/disneyplus')}>Disney+</button>
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
                className="search-bar"
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
<div  className='Container'>
<div className='Container1'>
<div >
														
<h1 >Who we are</h1>



<p>Our website address is: https://thevegamovies.casino.</p>



<h1 >What personal data we collect and why we collect it</h1>



<p >Comments</p>



<p>When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection.</p>



<p>An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: https://automattic.com/privacy/. After approval of your comment, your profile picture is visible to the public in the context of your comment.</p>



<p>Media</p>



<p>If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.</p>



<p >Contact forms</p>



<p >Cookies</p>



<p>If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.</p>



<p>If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.</p>



<p>When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select “Remember Me”, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.</p>



<p>If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.</p>



<p >Embedded content from other websites</p>



<p>Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.</p>



<p>These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.</p>



<p >Analytics</p>



<h1 >Who we share your data with</h1>



<h1 >How long we retain your data</h1>



<p>If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.</p>



<p>For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.</p>



<h1 >What rights you have over your data</h1>



<p>If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.</p>



<h1 >Where we send your data</h1>



<p>Visitor comments may be checked through an automated spam detection service.</p>



<h1>Your contact information</h1>



<h1 >Additional information</h1>



<p   >How we protect your data</p>



<p   >What data breach procedures we have in place</p>



<p >What third parties we receive data from</p>



<p  >What automated decision making and/or profiling we do with user data</p>



<p   >Industry regulatory disclosure requirements</p>
																				</div>
</div>
            <hr className='hr' />

            
            <div className="search-and-recent-container">
          

            {/* Recent Uploads Section */}
           
       


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

export default Privacy;
