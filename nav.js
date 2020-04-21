import React from 'react';
import './navigationBar.css';
import LocationSelectBox from '../LocationSelectBox';
import _get from 'lodash/get';
import _findIndex from 'lodash/findIndex';
import _map from 'lodash/map';
import axios from 'axios';
import ConfirmationBox from '../ConfirmationBox';
import AlertBox from '../AlertBox';
import $ from 'jquery';

class NavigationBar extends React.PureComponent {

  state = {
    selectedLocation: null,
    showInfoBox: false,
    toggleConfirmation: false,
    sites: [],
  }

  componentDidMount() {
    axios.get(`https://jiobeatplanner.st.ril.com:8082/api/plm/getPLMList?phoneno=${this.props.phoneno}`)
      .then(res => {
        const sites = this.formatOptions(res);
        this.setState({ sites });
      })
  }

  formatOptions = (response) => {
    const res = _get(response, 'data', []);
    const options = _map(res, (item)=> {
      return {
        value: item.siteid,
        label: item.type,
        verified: item.isprocessed === "1" ? true : false,
      }
    });
    return options;
  }

  updateSites = (verifiedSite) => {
    const newState = Object.assign({}, this.state.sites);
    const verifiedSiteIndex = _findIndex(newState, function(site) { return site.value === verifiedSite.value; })
    if (verifiedSiteIndex) {
      newState[verifiedSiteIndex].verified = true;
    }
    this.setState({sites: newState})
  }

  changeSelectedLocation = (selectedLocation) => {
    this.setState({ selectedLocation })
  }

  verifySelectedLocation = () => {
    const payload = {
        lat: _get(this, 'props.position.lat', '').toString(),
        lon: _get(this, 'props.position.lng', '').toString(),
        siteid: _get(this, 'state.selectedLocation.value', ''),
        phoneno: _get(this, 'props.phoneno', ''),
    }

    this.toggleConfirmationBox();
    const that = this;
    $.post("http://localhost:53400/api/plm/VerifyPLMUserLoc", payload, function (res) { 
      that.setState({         
        showAlertBox: true,         
        AlertText: 'Site verification Successfull!!',         
        alertType: 'success',       
      })       
      this.updateSites(_get(that, 'state.selectedLocation'));      
    })
    .fail(() => {
      that.setState({
        showAlertBox: true,
        AlertText: 'Site verification failed!!',
        alertType: 'failure',
      })
    })
  }

  closeAlertBox = () => {
    this.setState({ showAlertBox: false })
  }


  toggleInfoBox = () => {
    this.setState({ showInfoBox: !this.state.showInfoBox })
  }

  hideInfoBox = () => {
    this.setState({ showInfoBox: false })
  }

  toggleConfirmationBox = () => {
    this.setState({ toggleConfirmation: !this.state.toggleConfirmation });
  }

  render() {
    return (
      <div className="df fc">
        <div className="navHd">
          <div className="header_title">Site Locator</div>
          <img alt="jioLogo" src={require('./jioLogo.png')} className="jioLogoImg" />
        </div>
        <div className="df justifyContentCentre alignItemsCentre m-t-12 m-b-12">
          <LocationSelectBox
            selectedLocation={this.state.selectedLocation}
            changeSelectedLocation={this.changeSelectedLocation}
            phoneno={this.props.phoneno}
            sites={this.state.sites}
          />
          <button className="btn btn-sm btn-primary bVerify" id="bVerify" onClick={this.toggleConfirmationBox}>Verify</button>
        </div>
        <img alt="info" src={require("./info.svg")} className="infoIconImg" onClick={this.toggleInfoBox} />
        {this.state.showInfoBox &&
          <div className="df fc infoData">
            <img alt="close" src={require("./close.svg")} className="closeSvg pa" onClick={this.hideInfoBox} />
            <div>
              Instructions for Partner Location Verrification
            </div>
            <div>
              1. Choose the Site from the above Dropdown.
            </div>
            <div>
              2. Set the RED Marker to the  correct location of your Site.
            </div>
            <div>
              3. Click the Verify Button to confirm the Location.
            </div>
          </div>}
        {this.state.toggleConfirmation && <ConfirmationBox
          buttonType='primary'
          confirmationBody='Are you sure?'
          confirmBtnClick={this.verifySelectedLocation}
          closeConfirmationBox={this.toggleConfirmationBox}
        />}
        {this.state.showAlertBox && <AlertBox
          AlertText={this.state.AlertText}
          alertType={this.state.alertType}
          closeAlertBox={this.closeAlertBox}
        />}
      </div>
    );
  }
}

export default NavigationBar;
