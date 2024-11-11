import React, { useState } from 'react';
import './Styles/Admin.css';

const AdminPage = () => {
    const [newMovie, setNewMovie] = useState({
        name: '',
        description: '',
        description2: '',
        image: '',
        image2: '',
        image3: '',
        image4: '',
        image5: '',



        link720p: '',
        link1080p: '',
        industry: '',

        category: '',
        platform: '',
        filesize:'',
        filesize2:'',

        seasons720p: [],
        seasons1080p: [],

    });
    const [deleteName, setDeleteName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/movies`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMovie),
            });
    
            if (response.ok) {
                // Reset the newMovie state after successful submission
                setNewMovie({
                    name: '',
                    description: '',
                    description2: '',
                    image: '',
                    image2: '',
                    image3: '',
                    image4: '',
                    image5: '',
                    link720p: '',
                    link1080p: '',
                    industry: '',

                    category: '',
                    platform: '',
                    filesize: '',
                    filesize2: '',

                    seasons720p: [],
                    seasons1080p: [],

                });
                console.log('Movie added successfully');
                alert('Movie added successfully!'); // Notify user of success
            } else {
                const errorData = await response.json(); // Attempt to read the error response
                console.error('Error adding movie/web series:', errorData);
                alert(errorData.message || 'Failed to add movie.'); // Notify user of the error
            }
        } catch (error) {
            console.error('Error during movie submission:', error);
            alert('An error occurred while adding the movie. Please try again.'); // Notify user of network or other issues
        }
    };
    

    const handleDelete = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/movies`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json', // Set content type to JSON
                },
                body: JSON.stringify({ name: deleteName }), // Send the name in the request body
            });

            if (response.ok) {
                setDeleteName(''); // Clear the input field if successful
                console.log('Movie deleted successfully');
            } else {
                const errorData = await response.json();
                console.error('Error deleting movie/web series:', errorData.message);
            }
        } catch (error) {
            console.error('Failed to delete movie/web series:', error);
        }
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
    
        if (category === 'webseries') {
            const seasons720p = Array.from({ length: 50 }, () => ''); // Empty strings for each season
            const seasons1080p = Array.from({ length: 50 }, () => ''); // Empty strings for each season
    
            setNewMovie({ ...newMovie, category, seasons720p, seasons1080p });
        } else {
            setNewMovie({ ...newMovie, category, seasons720p: [], seasons1080p: [] });
        }
    };
    

    return (
        <div className="admin-page">
            <h1 className="admin-page-title">Admin Page</h1>
            <form className="movie-form" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Name"
                    value={newMovie.name}
                    onChange={(e) => setNewMovie({ ...newMovie, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Description1"
                    value={newMovie.description}
                    onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                    required
                />
                 <input
                    type="text"
                    placeholder="Description2"
                    value={newMovie.description2}
                    onChange={(e) => setNewMovie({ ...newMovie, description2: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="thumbnail"
                    value={newMovie.image}
                    onChange={(e) => setNewMovie({ ...newMovie, image: e.target.value })}
                    required
                />
                 <input
                    type="text"
                    placeholder="Screenshot 1"
                    value={newMovie.image2}
                    onChange={(e) => setNewMovie({ ...newMovie, image2: e.target.value })}
                    required
                />
                 <input
                    type="text"
                    placeholder="Screenshot 2"
                    value={newMovie.image3}
                    onChange={(e) => setNewMovie({ ...newMovie, image3: e.target.value })}
                    required
                />
                 <input
                    type="text"
                    placeholder="Screenshot 3"
                    value={newMovie.image4}
                    onChange={(e) => setNewMovie({ ...newMovie, image4: e.target.value })}
                    required
                />
                 <input
                    type="text"
                    placeholder="Screenshot 4"
                    value={newMovie.image5}
                    onChange={(e) => setNewMovie({ ...newMovie, image5: e.target.value })}
                    required
                />
                 <input
                    type="text"
                    placeholder="filesize for 780p"
                    value={newMovie.filesize}
                    onChange={(e) => setNewMovie({ ...newMovie, filesize: e.target.value })}
                    
                />
                 <input
                    type="text"
                    placeholder="filesize for 1080p"
                    value={newMovie.filesize2}
                    onChange={(e) => setNewMovie({ ...newMovie, filesize2: e.target.value })}
                    
                />
                <select className='CATEGORY' value={newMovie.category} onChange={handleCategoryChange}>
                    <option value="">Select Category (Optional)</option>
                    <option value="movies">Movies</option>
                    <option value="webseries">Web Series</option>
                </select>
                <select className='PLATFORM' value={newMovie.platform} onChange={(e) => setNewMovie({ ...newMovie, platform: e.target.value })} >
                    <option value="">Select Platform </option>
                    <option value="Netflix">Netflix</option>
                    <option value="AmazonPrime">Amazon Prime</option>
                    <option value="Disney+">Disney+</option>
                    <option value="K-Drama">K-Drama</option>
                    <option value="Adult">Adult</option>
                    <option value="MxPlayer">MxPlayer</option>
                    <option value="Anime">Anime</option>
                </select>
                <select className="INDUSTRY" value={newMovie.industry} onChange={(e) => setNewMovie({ ...newMovie, industry: e.target.value })}>
            <option value="">Select Industry</option>
            <option value="hollywood">Hollywood</option>
            <option value="bollywood">Bollywood</option>
        </select>
                {newMovie.category === 'movies' && (
    <>
        <input
            type="text"
            placeholder="Download Link (720p)"
            value={newMovie.link720p}
            onChange={(e) => setNewMovie({ ...newMovie, link720p: e.target.value })}
            
        />
        <input
            type="text"
            placeholder="Download Link (1080p)"
            value={newMovie.link1080p}
            onChange={(e) => setNewMovie({ ...newMovie, link1080p: e.target.value })}
            
        />
    </>
)}

{newMovie.category === 'webseries' && (
    <div>
        <h3>Add Season 720p Links (Optional):</h3>
        {newMovie.seasons720p.map((season, index) => (
            <input
                key={index}
                type="text"
                placeholder={`Season ${index + 1} 720p Link (Optional)`}
                value={season}
                onChange={(e) => {
                    const updatedSeasons720p = [...newMovie.seasons720p];
                    updatedSeasons720p[index] = e.target.value;
                    setNewMovie({ ...newMovie, seasons720p: updatedSeasons720p });
                }}
            />
        ))}
        {/* Optionally add a button to add more seasons if needed */}
    </div>
)}

{newMovie.category === 'webseries' && (
    <div>
        <h3>Add Season 1080p Links (Optional):</h3>
        {newMovie.seasons1080p.map((season, index) => (
            <input
                key={index}
                type="text"
                placeholder={`Season ${index + 1} 1080p Link (Optional)`}
                value={season}
                onChange={(e) => {
                    const updatedSeasons1080p = [...newMovie.seasons1080p];
                    updatedSeasons1080p[index] = e.target.value;
                    setNewMovie({ ...newMovie, seasons1080p: updatedSeasons1080p });
                }}
            />
        ))}
    </div>
)}

                <button type="submit">Add Movie/Web Series</button>
            </form>
            <h2>Delete Movie/Web Series</h2>
            <input
                type="text"
                placeholder="Movie/Web Series Name"
                value={deleteName}
                onChange={(e) => setDeleteName(e.target.value)}
            />
            <button onClick={handleDelete}>Delete</button>
        </div>
        
    );
};

export default AdminPage;
