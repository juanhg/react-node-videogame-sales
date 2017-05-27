import * as $ from 'jquery';
import * as Q from 'q';
import VideogameEntity from './videogameEntity';

// Sync mock data API, inspired from:
// https://gist.github.com/coryhouse/fd6232f95f9d601158e4
class VideogamesAPI {
  //This would be performed on the server in a real app. Just stubbing in.
  private _clone(item) {
    return JSON.parse(JSON.stringify(item));
  };


  //Q.Promise<Array<MemberEntity>
  getAllMembersAsync(): Q.Promise<VideogameEntity[]> {
    // Going more modern: check 'fetch' and ES6 Promise
    var deferred = Q.defer<Array<VideogameEntity>>();

    $.ajax({
      url: 'http://localhost:3000/videogames',
      dataType: "jsonp",
      success: function (data) {
        var videogames: Array<VideogameEntity>;
        videogames = data.map((videogame) => {
          return new VideogameEntity(<VideogameEntity> videogame);
        });
        deferred.resolve(videogames);
      }
    });

    return deferred.promise;
  };
}

export default new VideogamesAPI();