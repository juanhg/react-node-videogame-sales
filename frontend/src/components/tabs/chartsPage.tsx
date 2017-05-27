import * as React from 'react';
import VideogameEntity from '../../api/videogameEntity';
import VideogamesAPI from '../../api/videogamesAPI';

var autobind = require('autobind-decorator');

interface Props extends React.Props<ChartsPage> {
}

// We define members as a state (the compoment holding this will be a container
// component)
interface State {
  videogames: Array<VideogameEntity>
}

// Nice tsx guide: https://github.com/Microsoft/TypeScript/wiki/JSX
export default class ChartsPage extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    // set initial state
    this.state = { videogames: [] };
  }

  // Changing to componentDidMount to handle initial ajax request response
  public componentDidMount() {

    VideogamesAPI.promiseAll().then(function (videogames) {
      this.setState({ videogames: videogames.reverse() })
    }.bind(this))
  }

  public render() {

    return (
      <div className="charts-page">
        <h2> Charts Page</h2>
        UNDER CONSTRUCTION
      </div>
    );
  }
}
