import React from 'react';
import './confirmationBox.css';
import _get from 'lodash/get'

class ConfirmationBox extends React.Component {
    render() {
        const props = this.props;
        const buttonType = _get(props, 'buttonType', 'danger');
        return (
            <div className="pa confirmationBoxContainer">
                <div className="df fc">
                    <div className="titleContainer">
                        <div className="box_bodyTitle">You  are about to update a site location. Please make sure location is correct. </div>
                        <div className="mt8"><span class="box_body box_bodyLabel">Location:</span><span class="box_body">{`${_get(this, 'props.position.lat', '19')}, ${_get(this, 'props.position.lng', '82')}`}</span></div>
                        <div><span class="box_body box_bodyLabel">Address:</span><span class="box_body">{_get(this, 'props.selectedLocation.label', 'test label')}</span></div>
                    </div>
                    <div className="boxbtnGrp df">
                        <button onClick={this.props.closeConfirmationBox} className="btn btn-secondary cancelBtn">Cancel</button>
                        <button onClick={this.props.confirmBtnClick} className={`btn ${buttonType} btn-${buttonType}`}>{_get(props, 'confirmText', 'OK')}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConfirmationBox;
