import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Slider from 'rc-slider';

import * as HistoryActions from '../../../actions/history';
import PositionPanelComponent from '../historyForm1/positionPanel';
import CalendarPanelComponent from '../historyForm1/calendarPanel';
import HeaderStep from '../../base/headerStep/component';

import { urls } from '../../../routes';
import { getCoverage } from '../../../utils';

require('rc-slider/assets/index.css');

class CoverageFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { premiumValue: 100 };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditPositions = this.handleEditPositions.bind(this);
    this.handleSlider = this.handleSlider.bind(this);
  }

  componentWillMount() {
    if (this.props.positionList.length === 0) {
      browserHistory.push(urls.main.historyForm1.path);
    }
    if (window.localStorage.premiumValue) {
      this.setState({ premiumValue: parseInt(window.localStorage.premiumValue) });
    } else {
      window.localStorage.premiumValue = 100;
    }
  }

  handleEditPositions(event) {
    event.preventDefault();
    browserHistory.push(urls.main.historyForm1.path);
  }

  handleSubmit(event) {
    event.preventDefault();
    browserHistory.push(urls.main.assessmentForm.path);
  }

  handleSlider(premiumValue) {
    this.setState({ premiumValue });
    window.localStorage.premiumValue = premiumValue;
  }

  render() {
    const { positionList } = this.props;
    const { premiumValue } = this.state;
    return (
      <section className="section section-form">
        <h5 className="section-title">Create a Policy</h5>
        <div className="section-inner">
          <HeaderStep currenStep={4} />
          <div className="section-body">
            <div className="section-group-quaternary">
              <div className="form form-history">
                <div className="form-head">
                  <h2>
                    <i className="ico-check-secondary" />
                    Employment History
                  </h2>
                  <a href="" onClick={this.handleEditPositions} className="link">edit positions</a>
                  <div className="form-head-inner">
                    {positionList.map(position =>
                      <PositionPanelComponent
                        key={position.id} position={position}
                      />
                    )}
                    {positionList.length > 0 ?
                      <CalendarPanelComponent positionList={positionList} /> : null
                    }
                  </div>
                  <h2>Desired Coverage</h2>
                  <p>
                    Below is an estimate of benefits.
                    <br />
                    As your application becomes more complete you can see how
                    this affects your premiums and your coverage:
                  </p>
                </div>
              </div>
              <div className="slider">
                <div className="slider-inner">
                  <ul className="prices">
                    <li className="price">
                      <h5>Your Premiums Could be:</h5>
                      <p>$<span id="price-min">{premiumValue}</span>/month</p>
                    </li>
                    <li className="price price-secondary">
                      <h5>while your coverage could be:</h5>
                      <p>$<span id="price-max">{getCoverage(positionList, premiumValue)}</span>/month</p>
                    </li>
                  </ul>
                </div>
                <Slider
                  defaultValue={premiumValue} min={1} max={500} className="slider"
                  onChange={this.handleSlider}
                />
              </div>
              <a
                href=""
                className="btn btn-blue btn-big"
                onClick={this.handleSubmit}
              >
                Set Estimate
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

CoverageFormComponent.propTypes = {
  positionList: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    positionList: state.history.positionList
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(HistoryActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CoverageFormComponent);
