import * as React from 'react';
import { Link } from 'react-router';
import VideogameEntity from '../../entities/videogameEntity';

var autobind = require('autobind-decorator');

interface Props extends React.Props<VideogamesTable> {
  videogames: Array<VideogameEntity>
}

export default class VideogamesTable extends React.Component<Props, {}> {

  public render() {

    return (
      <div className="panel panel-default videogames-table">
        <table className="table table-hover table-responsive table-bordered">
          <thead>
            <tr>
              <th>Rank</th>
              <th className="name-column">Name</th>
              <th>Platform</th>
              <th>Year</th>
              <th>Genre</th>
              <th>Publisher</th>
              <th>NA_Sales</th>
              <th>EU_Sales</th>
              <th>JP_Sales</th>
              <th>Global_Sales</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.videogames.map((videogame: VideogameEntity) =>
                <tr>
                  <td>{videogame.Rank}</td>
                  <td>{videogame.Name}</td>
                  <td>{videogame.Platform}</td>
                  <td>{videogame.Year}</td>
                  <td>{videogame.Genre}</td>
                  <td>{videogame.Publisher}</td>
                  <td>{videogame.NA_Sales}</td>
                  <td>{videogame.EU_Sales}</td>
                  <td>{videogame.JP_Sales}</td>
                  <td>{videogame.Global_Sales}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}
