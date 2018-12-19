import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/mydb');

const schema = mongoose.Schema({
  vote_count: {
    type: Number
  },
  id: {
    type: Number
  },
  video: {
    type: Boolean
  },
  vote_average: {
    type: Number
  },
  title: {
    type: String
  },
  popularity: {
    type: Number
  },
  poster_path: {
    type: String
  },
  original_language: {
    type: String
  },
  original_title: {
    type: String
  },
  genre_ids: {
    type: Array
  },
  backdrop_path: {
    type: String
  },
  adult: {
    type: Boolean
  },
  overview: {
    type: String
  },
  release_date: {
    type: String
  }
});

export default mongoose.model('Movie', schema);
    