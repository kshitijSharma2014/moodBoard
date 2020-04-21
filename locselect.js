import React from "react";
import Select from "react-select";
import './locationSelectBox.css';

const formatOptionLabel = ({ value, label, verified }) => (
  <div className="formatOption">
    {verified ? <div className="verifiedIcon">
      <img alt="verified" src={require("./verified.svg")} className="verifySvg" />
    </div> : <div className="verifiedIcon">
        <img alt="unverified" src={require("./unverified.svg")} className="verifySvg" />
      </div>}
    <div className="locationLabel">{label}</div>
  </div>
);

class LocationSelectBox extends React.Component {

  onSelectedLocationChange = (selected) => {
    this.props.changeSelectedLocation(selected);
  }

  render() {
    return (
      <div className="selectBoxContainer">
        <Select
          value={this.props.selectedLocation}
          formatOptionLabel={formatOptionLabel}
          options={this.props.sites}
          placeholder='Select partner location'
          onChange={this.onSelectedLocationChange}
          styles={{
            option: base => ({
              ...base,
              'border-bottom': `1px solid #005190`,

            }),
          }}
        />
      </div>
    )
  }
}

export default LocationSelectBox;
