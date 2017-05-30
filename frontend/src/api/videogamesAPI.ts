import * as $ from 'jquery';
import * as Q from 'q';
import VideogameEntity from '../entities/videogameEntity';

var Promise = require('es6-promise');

class VideogamesAPI {

  private rootPath = 'http://localhost:3000/videogames';

  promiseAll() {
    return this.resolveGetPromise(this.rootPath);
  };

  promiseFindByFilter(filterId, filter) {
    var url = '{root}/{filterId}/{filter}'
      .replace('{root}', this.rootPath)
      .replace('{filterId}', filterId.toLowerCase())
      .replace('{filter}', filter);

    return this.resolveGetPromise(url);
  };

  promiseGroupByGenre() {
    var url = '{root}/group/genre'.replace('{root}', this.rootPath);
    return this.resolveGetPromise(url);
  };

  resolveGetPromise(url) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        dataType: "jsonp",
        success: function (data) {
          var videogames: Array<VideogameEntity>;
          videogames = data.map((videogame) => {
            return new VideogameEntity(<VideogameEntity>videogame);
          });
          resolve(videogames);
        }
      });
    });
  }

}

export default new VideogamesAPI();