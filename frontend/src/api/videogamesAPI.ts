import * as $ from 'jquery';
import * as Q from 'q';
import VideogameEntity from './videogameEntity';

var Promise = require('es6-promise');

class VideogamesAPI {

  private rootPath = 'http://localhost:3000/videogames';

  promiseAll() {
    return this.resolveGetPromise(this.rootPath);
  };

  promiseFindByFilter(filter) {
    var url = this.rootPath + '/' + filter;
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