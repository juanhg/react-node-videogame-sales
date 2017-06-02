import * as $ from 'jquery';
import * as Q from 'q';
import VideogameEntity from '../entities/videogameEntity';
import GroupEntity from '../entities/groupEntity';

var Promise = require('es6-promise');

class VideogamesAPI {

  private rootPath = 'http://localhost:3000/videogames';

  public promiseAll(): Promise<VideogameEntity[]> {
    return this.resolveGetPromise(this.rootPath);
  };

  public promiseFindByFilter(filterId, filter): Promise<VideogameEntity[]> {
    var url = '{root}/{filterId}/{filter}'
      .replace('{root}', this.rootPath)
      .replace('{filterId}', filterId.toLowerCase())
      .replace('{filter}', filter);

    return this.resolveGetPromise(url);
  };

  public promiseGroupByGenre(): Promise<GroupEntity[]> {
    var url = '{root}/group/genre'.replace('{root}', this.rootPath);
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        dataType: "jsonp",
        success: function (data) {
          var groups: Array<GroupEntity>;
          groups = data.map((groups) => {
            return <GroupEntity>groups;
          });
          resolve(groups);
        }
      });
    });
  };

  public promiseGroupBy(fieldId: string): Promise<GroupEntity[]> {
    var url = '{root}/group/{fieldId}'
      .replace('{root}', this.rootPath)
      .replace('{fieldId}', fieldId.toLowerCase())

    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        dataType: "jsonp",
        success: function (data) {
          var groups: Array<GroupEntity>;
          groups = data.map((groups) => {
            return <GroupEntity>groups;
          });
          resolve(groups);
        }
      });
    });
  };

    public promiseGroupByWithFilter(fieldId: string, filter: string): Promise<GroupEntity[]> {
    var url = '{root}/group/{fieldId}/{filter}'
      .replace('{root}', this.rootPath)
      .replace('{fieldId}', fieldId.toLowerCase())
      .replace('{filter}', filter);

    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        dataType: "jsonp",
        success: function (data) {
          var groups: Array<GroupEntity>;
          groups = data.map((groups) => {
            return <GroupEntity>groups;
          });
          resolve(groups);
        }
      });
    });
  };


  public resolveGetPromise(url): Promise<VideogameEntity[]> {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        dataType: "jsonp",
        success: function (data) {
          var videogames: Array<VideogameEntity>;
          videogames = data.map((videogame) => {
            return <VideogameEntity>videogame;
          });
          resolve(videogames);
        }
      });
    });
  }
}

export default new VideogamesAPI();