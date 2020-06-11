import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import List, { Time } from './utils/styledComponents';
import MonitorTransformers from './components/Monitor';
import History from './components/History';
import Dashboard from './components/Dashboard';
import * as actionCreators from './actions/menuActions';
import Black from './utils/fonts/Roboto-Bold.ttf';


const underNavUnderline = {
  borderBottomWidth: '3px',
  bordeBottomStyle: 'solid',
  borderBottomColor: 'blue',
};

const mapStateToProps = (state) => ({
  activeMenu: state.menuHandler.navMenu,
});

@connect(mapStateToProps, actionCreators)
class App extends Component {
  componentDidMount = () => {
    setInterval(() => {
      const now = new Date();
      this.setState({
        time: now.toLocaleTimeString('it-IT'),
      });
    }, 1000);
  }

  state = {
    time: '',
  }

  highlightForMonitor = () => {
    const { activeMenu } = this.props;

    if (activeMenu === 'monitorNetwork') {
      return underNavUnderline;
    }
    return null;
  };

  highlightForHistory = () => {
    const { activeMenu } = this.props;

    if (activeMenu === 'history') {
      return underNavUnderline;
    }
    return null;
  };

  highlightForSetting = () => {
    const { activeMenu } = this.props;
    if (activeMenu === 'dashboard') {
      return underNavUnderline;
    }
    return null;
  };


  setMonitorNav = () => {
    const { setMonitorMenu } = this.props;
    setMonitorMenu();
  };

  setHistoryNav = () => {
    const { setHistoryMenu } = this.props;
    setHistoryMenu();
  };

  setDashboardNav = () => {
    const { setDashboardMenu } = this.props;
    setDashboardMenu();
  };

  render() {
    const { time } = this.state;
    return (
      <Router>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ul style={{ display: 'flex' }}>
            <List
            style={this.highlightForMonitor()}
            onClick={() => this.setMonitorNav()}
            >
              <Link style={{
                color: 'white', fontFamily: Black, display: 'inline-block', width: '100%', height: '100%',
              }} to="/">МОНИТОРИНГ СЕТИ</Link>
            </List>
            <List
            style={this.highlightForHistory()}
            onClick={() => this.setHistoryNav()}
            >
              <Link style={{
                color: 'white', fontFamily: Black, display: 'inline-block', width: '100%', height: '100%',
              }} to="/history">ИСТОРИЯ</Link>
            </List>
            <List
            style={this.highlightForSetting()}
            onClick={() => this.setDashboardNav()}
            >
              <Link style={{
                color: 'white', fontFamily: Black, display: 'inline-block', width: '100%', height: '100%',
              }} to="/dashboard">ДАШБОАРД</Link>
            </List>
          </ul>
          <Time style={{ marginRight: 100 }}>{time}</Time>
        </div>
        <Switch>
            <Route exact path="/">
              <MonitorTransformers />
            </Route>
            <Route exact path="/history">
              <History />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
      </Router>
    );
  }
}

export default App;
