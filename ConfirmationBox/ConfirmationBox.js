import React from 'react';
import './confirmationBox.css';
import _get from 'lodash/get'

class ConfirmationBox extends React.Component {
    render() {
        const props = this.props;
        const buttonType = _get(props, 'buttonType', 'primary');
        return (
            <div className="pa confirmationBoxContainer">
                <div className="df fc">
                    <div className="titleContainer">
                        <button class="bootbox-close-button close" type="button">×</button>
                        <div class="bootbox-body">{_get(props, 'confirmationBody','Are you sure?')}</div>
                    </div>
                    <div className="boxbtnGrp df">
                        <button className="btn btn-secondary cancelBtn">Cancel</button>
                        <button className={`btn ${buttonType} btn-${buttonType}`}>{_get(props, 'confirmText', 'OK')}</button>

                    </div>

                </div>
            </div>
        );
    }
}

export default ConfirmationBox;