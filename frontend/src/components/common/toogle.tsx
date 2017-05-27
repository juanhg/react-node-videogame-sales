import * as React from 'react';
import { Link } from 'react-router';

var ToggleButton = require('react-toggle-button'),
  autobind = require('autobind-decorator');


interface Props extends React.Props<Toogle> {
  value: boolean,
  onToogle: Function
}

interface State {
  value: boolean
}

export default class Toogle extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }


  @autobind
  public onChange(event) {
    this.setState({
      value: !this.state.value
    });
    this.props.onToogle(event);
  }

  public render() {
  
    return (
      <div className="toogle-button">
      <ToggleButton
        inactiveLabel={''}
        activeLabel={''}
        colors={{
          activeThumb: {
            base: 'rgb(250,250,250)',
          },
          inactiveThumb: {
            base: 'rgb(250,0,0)',
          },
          active: {
            base: 'rgb(207,221,245)',
            hover: 'rgb(177, 191, 215)',
          },
          inactive: {
            base: 'rgb(250,200,200)',
            hover: 'rgb(250,160,160)',
          }
        }}
        thumbAnimateRange={[0, 36]}
        value={this.state.value}
        onToggle={this.onChange} />
        </div>
    );
  }
}
