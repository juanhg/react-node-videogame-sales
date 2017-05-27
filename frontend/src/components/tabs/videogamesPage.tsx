import * as React from 'react';
import {Link} from 'react-router';

import VideogameEntity from '../../api/videogameEntity';
import VideogamesAPI from '../../api/videogamesAPI';

var Loader = require('react-loader');


interface Props extends React.Props<VideogamesPage> {}

interface State {
  videogames: Array<VideogameEntity>,
  loaded: boolean
}


export default class VideogamesPage extends React.Component<Props, State> {
  
  constructor(props: Props) {
    super(props);
    this.state = { 
      videogames: [],
      loaded: false 
    };
  }

  public componentDidMount() {
    var promise: Q.Promise<VideogameEntity[]> = VideogamesAPI.getAllMembersAsync();

    promise.done(function (videogames) {
      this.setState({ 
        videogames: videogames,
        loaded: true 
      });
    }.bind(this))
  }
  
    public render() {

    return (
      <div >
        <h2> Videogames Page</h2>
              <Loader loaded={this.state.loaded}>
            {
              this.state.videogames.map((videogame: VideogameEntity) =>
                <div> {videogame.Name} </div>
              )
            }
            </Loader>
      </div>
    );
  }
}
