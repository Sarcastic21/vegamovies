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



        link: '',
        category: '',
        platform: '',
        filesize:'',
        seasons: [],
    });
    const [deleteName, setDeleteName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5008/api/movies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMovie),
        });

        if (response.ok) {
            setNewMovie({
                name: '',
                description: '',
                description2: '',
                image: '',
                image2: '',
                image3: '',

                image4: '',
                image5: '',



                link: '',
                category: '',
                platform: '',
                filesize:'',
                seasons: [],
            });
            console.log('Movie added successfully');
        } else {
            const errorData = await response.json();
            console.error('Error adding movie/web series:', errorData);
        }
    };

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:5008/api/movies/${deleteName}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setDeleteName('');
            console.log('Movie deleted successfully');
        } else {
            console.error('Error deleting movie/web series');
        }
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        if (category === 'webseries') {
            const seasons = Array.from({ length: 50 }, () => '');
            setNewMovie({ ...newMovie, category, seasons });
        } else {
            setNewMovie({ ...newMovie, category, seasons: [] });
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
                    placeholder="Description"
                    value={newMovie.description}
                    onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                    required
                />
                 <input
                    type="text"
                    placeholder="Description"
                    value={newMovie.description2}
                    onChange={(e) => setNewMovie({ ...newMovie, description2: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={newMovie.image}
                    onChange={(e) => setNewMovie({ ...newMovie, image: e.target.value })}
                    required
                />
                 <input
                    type="text"
                    placeholder="Image URL"
                    value={newMovie.image2}
                    onChange={(e) => setNewMovie({ ...newMovie, image2: e.target.value })}
                    required
                />
                 <input
                    type="text"
                    placeholder="Image URL"
                    value={newMovie.image3}
                    onChange={(e) => setNewMovie({ ...newMovie, image3: e.target.value })}
                    required
                />
                 <input
                    type="text"
                    placeholder="Image URL"
                    value={newMovie.image4}
                    onChange={(e) => setNewMovie({ ...newMovie, image4: e.target.value })}
                    required
                />
                 <input
                    type="text"
                    placeholder="Image URL"
                    value={newMovie.image5}
                    onChange={(e) => setNewMovie({ ...newMovie, image5: e.target.value })}
                    required
                />
                 <input
                    type="text"
                    placeholder="filesize"
                    value={newMovie.filesize}
                    onChange={(e) => setNewMovie({ ...newMovie, filesize: e.target.value })}
                    required
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
                {newMovie.category === 'movies' && (
                    <input
                        type="text"
                        placeholder="Download Link"
                        value={newMovie.link}
                        onChange={(e) => setNewMovie({ ...newMovie, link: e.target.value })}
                        required
                    />
                )}
                {newMovie.category === 'webseries' && (
                    <div>
                        <h3>Add Season Links (Optional):</h3>
                        {newMovie.seasons.map((season, index) => (
                            <input
                                key={index}
                                type="text"
                                placeholder={`Season ${index + 1} Link (Optional)`}
                                value={season}
                                onChange={(e) => {
                                    const updatedSeasons = [...newMovie.seasons];
                                    updatedSeasons[index] = e.target.value;
                                    setNewMovie({ ...newMovie, seasons: updatedSeasons });
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
