import React from 'react';
import './alertBox.css';
import _get from 'lodash/get'

class ConfirmationBox extends React.Component {

    componentDidMount() {
        const that = this;
    window.setTimeout(function () {
        that.props.closeAlertBox();
      }, 1000000);
    }

    render() {
        const props = this.props;
        return (
            <div className={`pa alertBoxContainer alert-${props.alertType}`}>
                <div className="df fc">
                    <div className="alertTitleContainer">
                        <button onClick={this.props.closeAlertBox} class="bootbox-close-button close" type="button">×</button>
                        <div class="bootbox-body">{_get(props, 'AlertText', 'Site Location verified!!')}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConfirmationBox;