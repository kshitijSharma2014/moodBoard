import React from "react";
import _get from 'lodash/get';

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currPosition: null,
    }
    this.setCurrLoc = this.setCurrLoc.bind(this);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setCurrLoc, function () {
      });
    } else {
      console.log('error')
    }
  }

  setCurrLoc = (position) => {
    const currPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    this.setState({ currPosition: currPosition })
  }

  onMapLoad = (map, position) => {
     this.marker = new window.google.maps.Marker({
      position: position,
      map: map,
      draggable: true,
      animation: true,
      title: 'My Location'
    });
    this.marker.addListener('dragend', this.handleDragEndEvent);
    this.props.setPosition(position);
  }

  handleDragEndEvent = (event) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
    this.props.setPosition(newPosition);
  }

  onScriptLoad = () => {
    const position = _get(this, 'state.currPosition', {
      lat: 19,
      lng: 72,
    });
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
      s.addEventListener('load', e => {
        this.onScriptLoad()
      })
    } else {
      this.onScriptLoad()
    }
  }

  setCurrentLocation = () => {
    const pos = this.state.currPosition;
    console.log(pos);
    this.map.setCenter(pos);
    this.map.setZoom(15);
   this.props.setPosition(pos);
   const latlng = new window.google.maps.LatLng(pos.lat, pos.lng);
   this.marker.setPosition(latlng);
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div style={{ width: '100%', height: '100%' }} id="newMap"></div>
        <img src={require("./marker.svg")} onClick={this.setCurrentLocation} className="markerSvg pa" />
      </div>
    )
  }
}

export default Map;
