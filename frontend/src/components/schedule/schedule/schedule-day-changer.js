import React from 'react';
import CustomButton from '../../../shared/elements/button/custom-button.component';

const ScheduleDayChanger = props => {

    return (
        <div className="grid33 size-holder middle">
            <div className="pull-left mobile-fill">
                <CustomButton
                    label="&#8656; Previous Day"
                    buttonStyle="soft-green"
                    action={() => props.action('last')} />
            </div>
            <div className="middle">
                <CustomButton
                    label="&#8662; Calendar &#8663;"
                    buttonStyle="green"
                    action={() => props.action('back')} />
            </div>
            <div className="pull-right mobile-fill">
                <CustomButton
                    label="Next Day &#8658;"
                    buttonStyle="soft-green"
                    action={() => props.action('next')} />
            </div>
        </div>
    )
}


export default ScheduleDayChanger;