import React from 'react';
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import Features from "./Components/Features/Features";
import Footer from "./Components/Footer/Footer";
import Calendar from "./Components/Calendar/Calendar";
import Details from "./Components/Details/Details";
import FetchData from "./service/FetchData";
import './style.css';

class App extends React.Component {
  fetchData = new FetchData();

  state = {
    rocket: 'Falcon 1',
    rocketFeatures: null,
    rockets: [],
    company: null,
  }

  componentDidMount() {
    this.updateRocket();
    this.updateCompany();
  }

  updateRocket() {
    this.fetchData.getRocket()
      .then(data => {
        this.setState({ rockets: data.map(item => item.name)});

        return data;
      }).then(data => data.find(item => item.name === this.state.rocket))
      .then(rocketFeatures => this.setState({ rocketFeatures }));
  }

  updateCompany = () => {
    this.fetchData.getCompany()
      .then(data => this.setState({company: data}));
  }

  changeRocket = rocket => {
    this.setState({
      rocket
    }, this.updateRocket);
  }

  render() {
    return (
      <React.Fragment>
        <Header rockets={this.state.rockets} changeRocket={this.changeRocket}/>
        <Main rocket={this.state.rocket}/>
        {this.state.rocketFeatures && <Features {...this.state.rocketFeatures}/>}
        {this.state.company && <Footer {...this.state.company.links}/>}
      </React.Fragment>
    );
  }
}

export default App;
