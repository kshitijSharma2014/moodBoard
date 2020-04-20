import React from 'react';
import PropTypes from 'prop-types';
import './navigationBar.css';
import LocationSelectBox from '../LocationSelectBox';
import _get from 'lodash/get';
import axios from 'axios';
import ConfirmationBox from '../ConfirmationBox';
import AlertBox from '../AlertBox';
import $ from 'jquery';

class NavigationBar extends React.PureComponent {

  state = {
    selectedLocation: null,
    showInfoBox: false,
    toggleConfirmation: false,
  }

  changeSelectedLocation = (selectedLocation) => {
    this.setState({ selectedLocation })
  }

  verifySelectedLocation = () => {
    const payload = {
      usrdata: {
        lat: _get(this, 'props.position.lat', '').toString(),
        lon: _get(this, 'props.position.lng', '').toString(),
        siteid: _get(this, 'state.selectedLocation.value', ''),
        phoneno: _get(this, 'props.phoneno', ''),
      }
    }

    const config = {
      headers: {
        datatype: 'json',
        contentType: 'application/json',
        charset: 'utf-8'
      }
    }
    this.toggleConfirmationBox();
    $.post("http://localhost:53400/api/plm/VerifyPLMUserLoc", payload, function (res) {     
      console.log(res);
      console.log(res.data);
      this.setState({
        showAlertBox: true,
        AlertText: 'Site verification Successfull!!',
        alertType: 'success',
      })
    })
    .fail(() => {
      this.setState({
        showAlertBox: true,
        AlertText: 'Site verification failed!!',
        alertType: 'failure',
      })
    })
    // axios.post('https://jiobeatplanner.st.ril.com:8082/api/plm/VerifyPLMUserLoc', payload, config)
    //   .then(res => {
    //     console.log(res);
    //     console.log(res.data);
    //     this.setState({
    //       showAlertBox: true,
    //       AlertText: 'Site verification Successfull!!',
    //       alertType: 'success',
    //     })
    //   })
    //   .catch(() => {
    //     this.setState({
    //       showAlertBox: true,
    //       AlertText: 'Site verification failed!!',
    //       alertType: 'failure',
    //     })
    //   })
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
          <img src={require('./jioLogo.png')} className="jioLogoImg" />
        </div>
        <div className="df justifyContentCentre alignItemsCentre m-t-12 m-b-12">
          <LocationSelectBox
            selectedLocation={this.state.selectedLocation}
            changeSelectedLocation={this.changeSelectedLocation}
            phoneno={this.props.phoneno}
          />
          <button className="btn btn-sm btn-primary bVerify" id="bVerify" onClick={this.toggleConfirmationBox}>Verify</button>
        </div>
        <img src={require("./info.svg")} className="infoIconImg" onClick={this.toggleInfoBox} />
        {this.state.showInfoBox &&
          <div className="df fc infoData">
            <img src={require("./close.svg")} className="closeSvg pa" onClick={this.hideInfoBox} />
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
