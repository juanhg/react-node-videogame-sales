import * as $ from 'jquery';
import * as Q from 'q';
import VideogameEntity from './videogameEntity';

var Promise = require('es6-promise');

class VideogamesAPI {

  private _clone(item) {
    return JSON.parse(JSON.stringify(item));
  };

  promiseAll() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'http://localhost:3000/videogames',
        dataType: "jsonp",
        success: function (data) {
          var videogames: Array<VideogameEntity>;
          videogames = data.map((videogame) => {
            return new VideogameEntity(<VideogameEntity> videogame);
          });
          resolve(videogames);
        }
      });
    });
  };
}

export default new VideogamesAPI();