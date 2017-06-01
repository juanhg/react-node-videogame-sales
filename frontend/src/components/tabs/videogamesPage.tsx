import * as React from 'react';
import { Link } from 'react-router';

import VideogameEntity from '../../entities/videogameEntity';
import VideogamesService from '../../services/videogamesService';
import VideogamesTable from '../common/videogamesTable';
import GroupEntity from '../../entities/GroupEntity';

import Toogle from '../common/toogle';

var Loader = require('react-loader'),
  DebounceInput = require('react-debounce-input'),
  autobind = require('autobind-decorator'),
  logo = require('../../../resources/images/logo.png');

interface Props extends React.Props<VideogamesPage> { }



interface State {
  nameFilter: string,
  platformFilter: string,
  genreFilter: string,
  publisherFilter: string,
  videogames: Array<VideogameEntity>,
  groups: Array<GroupEntity>,
  loaded: boolean,
  salesByGenre: Array<VideogameEntity>,
  selector: string,
  groupSelector: string,
  selectedChart: string
}

export default class VideogamesPage extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      nameFilter: "",
      platformFilter: "",
      genreFilter: "",
      publisherFilter: "",
      videogames: [],
      groups: [],
      loaded: false,
      salesByGenre: [],
      selector: "one",
      selectedChart: "Line",
      groupSelector: "Platform"
    };
  }

  public componentDidMount() {
    this.loadAll();
  }

  @autobind
  protected loadAll() {
    var me = this;
    me.setLoading(true);
    VideogamesService.promiseAll().then(function (videogames) {
      me.state.videogames = videogames;
      me.setLoading(false);
    });
  }

  @autobind
  protected onFilterChange(event) {
    var me = this,
      filterId = event.target.name,
      filter = event.target.value;

    me.updateFilterState(filterId, filter);
    me.setLoading(true);

    var promise = filter && filterId
      ? VideogamesService.promiseFindByFilter(filterId, filter)
      : VideogamesService.promiseAll();

    promise.then(function (videogames) {
      me.state.videogames = videogames;
      me.setLoading(false);
    });
  }

  private updateFilterState(filterId, filter) {
    if (filterId) {
      switch (filterId.toLowerCase()) {
        case 'name':
          this.state.nameFilter = filter;
          this.state.platformFilter = "";
          this.state.genreFilter = "";
          this.state.publisherFilter = "";
          break;
        case 'platform':
          this.state.platformFilter = filter;
          this.state.nameFilter = "";
          this.state.genreFilter = "";
          this.state.publisherFilter = "";
          break;
        case 'genre':
          this.state.genreFilter = filter;
          this.state.nameFilter = "";
          this.state.platformFilter = "";
          this.state.publisherFilter = "";
          break;
        case 'publisher':
          this.state.publisherFilter = filter;
          this.state.nameFilter = "";
          this.state.platformFilter = "";
          this.state.genreFilter = "";
          break;
      }
    }
    else {
      this.state.nameFilter = "";
      this.state.platformFilter = "";
      this.state.genreFilter = "";
      this.state.publisherFilter = "";
    }
  }

  @autobind
  protected setLoading(enabled) {
    this.state.loaded = !enabled;
    this.forceUpdate();
  }

  //TODO refactor DebounceInputs (loop through collection)
  public render() {
    return (
      <div className="charts-page">
        <div className="main-container">
          <div className="left-container">
            <DebounceInput
              className="form-control videogames-filter"
              placeholder="Filter by Name"
              name="Name"
              value={this.state.nameFilter}
              minLength={2}
              debounceTimeout={300}
              onChange={this.onFilterChange} />
            <DebounceInput
              className="form-control videogames-filter"
              name="Platform"
              placeholder="Filter by Platform"
              value={this.state.platformFilter}
              minLength={2}
              debounceTimeout={300}
              onChange={this.onFilterChange} />
            <DebounceInput
              className="form-control videogames-filter"
              name="Genre"
              placeholder="Filter by Genre"
              value={this.state.genreFilter}
              minLength={2}
              debounceTimeout={300}
              onChange={this.onFilterChange} />
            <DebounceInput
              className="form-control videogames-filter"
              name="Publisher"
              placeholder="Filter by Publisher"
              value={this.state.publisherFilter}
              minLength={2}
              debounceTimeout={300}
              onChange={this.onFilterChange} />
            <div className="shape-block">
              <img className="shape" src={logo} />
            </div>
          </div>
          <div className="right-container">
            <Loader loaded={this.state.loaded}>
              <VideogamesTable videogames={this.state.videogames} />
            </Loader>
          </div>
        </div>
      </div>
    );
  }
}
