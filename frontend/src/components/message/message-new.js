import React from 'react';
import CustomButton from '../../shared/elements/button/custom-button.component';

const MessageNew = (props) => {
    return (
        <div>
            {props.addMode ?
                <div>
                    <div className='border'>
                        form
                    </div>
                    <br />
                </div>
                :
                <div className='full-button'>
                    <div className='grid100'>
                        <CustomButton
                            buttonStyle="blue"
                            label="Add New Message"
                            action={props.action}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default MessageNew;