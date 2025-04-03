import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import { getMovieDetails } from '../api';
import { MovieDetails } from '../types';

function MovieDetailsScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovieDetails() {
      if (!id) return;
      try {
        const details = await getMovieDetails(id);
        setMovie(details);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-white">Loading...</div>;
  }

  if (!movie) {
    return <div className="text-center mt-8 text-white">Movie not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 mb-6 text-gray-300 hover:text-white"
      >
        <ArrowLeft size={20} />
        <span>Back to Search</span>
      </button>

      <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
              alt={movie.Title}
              className="w-full h-[450px] object-cover"
            />
          </div>
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold text-white mb-2">{movie.Title}</h1>
            <div className="flex items-center gap-2 mb-4">
              <Star className="text-yellow-400" fill="currentColor" size={20} />
              <span className="text-lg text-white">{movie.imdbRating}/10</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-400">Year</p>
                <p className="font-semibold text-white">{movie.Year}</p>
              </div>
              <div>
                <p className="text-gray-400">Runtime</p>
                <p className="font-semibold text-white">{movie.Runtime}</p>
              </div>
              <div>
                <p className="text-gray-400">Genre</p>
                <p className="font-semibold text-white">{movie.Genre}</p>
              </div>
              <div>
                <p className="text-gray-400">Released</p>
                <p className="font-semibold text-white">{movie.Released}</p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-white">Plot</h2>
              <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">Director</h2>
                <p className="text-gray-300">{movie.Director}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">Cast</h2>
                <p className="text-gray-300">{movie.Actors}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsScreen;