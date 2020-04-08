import React from "react";
import ReactDOM from "react-dom";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Google
} from "react-google-maps";
import _get from 'lodash/get';


class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currPosition: null,
    }
    const that = this;
    this.setCurrLoc = this.setCurrLoc.bind(this);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setCurrLoc, function () {
        //this.handleLocationError(true, infoWindow, this.map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      //this.handleLocationError(false, infoWindow, this.map.getCenter());
    }
  }

  setCurrLoc = (position) => {
    const currPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    console.log(currPosition);
    this.setState({ currPosition: currPosition })
    debugger;
  }

  onMapLoad = (map, position) => {
    const marker = new window.google.maps.Marker({
      position: position,
      map: map,
      draggable: true,
      animation: true,
      title: 'My Location'
    });
    marker.addListener('dragend', this.handleDragEndEvent);
    this.props.setPosition(position);
  }

  handleDragEndEvent = (event) => {
    console.log('latitude: ', event.latLng.lat());
    console.log('longitued: ', event.latLng.lng());
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
    this.props.setPosition(newPosition);
    this.setState({ currPosition: newPosition })
  }

  onScriptLoad = () => {
    const position = _get(this, 'state.currPosition', {
      lat: 19,
      lng: 72,
    });

    /*{
      lat: 19.0759837,
      lng: 72.8776559,
    }*/
    debugger;
    const option = {
      center: position,
      zoom: 15,
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false
    };
    this.map = new window.google.maps.Map(
      document.getElementById('newMap'), option);
    this.onMapLoad(this.map, position);
  }

  componentDidMount() {
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=AIzaSyDnZHCNVuYH8lZSMZtuHzJ4677eUi6AE8w`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      // Below is important. 
      //We cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        this.onScriptLoad()
      })
    } else {
      this.onScriptLoad()
    }
  }

  componentWillMount = () => {
    const that = this;
    /*if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const currPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log(currPosition);
        that.setState({currPosition: currPosition})
        debugger;
      }, function() {
        //this.handleLocationError(true, infoWindow, this.map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      //this.handleLocationError(false, infoWindow, this.map.getCenter());
    }*/
  }

  setCurrentLocation = () => {
    debugger;
    const pos = this.state.currPosition;
    console.log(pos);
    this.map.setCenter(pos);
    this.onMapLoad(this.map, pos);
  }


  handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(this.map);
  }


  render() {
    const props = this.props;
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div style={{ width: '100%', height: '100%' }} id="newMap"></div>
        <img src={require("./marker.svg")} onClick={this.setCurrentLocation} className="markerSvg pa" />
      </div>
    )
  }
}


export default Map;
