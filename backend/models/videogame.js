var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var videogameSchema = new Schema(
{
  rank: Number,
  name: String,
  platform: String,
  year: Number,
  genre: {
    type: String,
    enum: [
      'Action', 
      'Adventure', 
      'Fighting', 
      'Misc', 
      'Platform',
      'Puzzle',
      'Shooter',
      'Simulation',
      'Sports',
      'Strategy'
      ]
  },
  publisher: String,
  NA_sales: Number,
  EU_sales: Number,
  JP_sales: Number,
  global_sales: Number
},
{
  collection: 'videogames'
});

module.exports = mongoose.model('videogame', videogameSchema);  