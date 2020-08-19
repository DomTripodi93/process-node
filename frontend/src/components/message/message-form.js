import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CustomButton from '../../shared/elements/button/custom-button.component';
import FormInput from '../../shared/elements/form-input/form-input.component';
import { addMessage, updateMessage } from '../../reducers/message/message.actions';


const MessageForm = props => {
    const [messageInfo, setMessageInfo] = useState({
        message: ''
    });

    const { message } = messageInfo;

    useEffect(() => {
        if (props.editMode) {
            setMessageInfo({ message: props.messageInput.message });
        }
    }, [props])

    const handleSubmit = async event => {
        event.preventDefault();
        if (props.editMode) {
            if (message !== props.messageInput.message) {
                props.updateMessage(messageInfo, props.callback);
            } else {
                props.callback();
            }
        } else {
            props.addMessage(messageInfo, props.callback);
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setMessageInfo({ [name]: value });
    };

    return (
        <div className='middle'>
            {!props.editMode ?
                <h3 className='centered'>
                    Fill out the form below to add a Message
                </h3>
                :
                <h3 className='centered'>
                    Update this message
                </h3>
            }
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Message'
                    type='text'
                    name='message'
                    value={message}
                    onChange={handleChange}
                    required
                />
                <div className="grid50">
                    {!props.editMode ?
                        <CustomButton
                            buttonStyle="blue"
                            type="submit"
                            label="Add"
                        />
                        :
                        <CustomButton
                            buttonStyle="blue"
                            type="submit"
                            label="Update"
                        />
                    }
                    <CustomButton
                        buttonStyle="red"
                        action={props.callback}
                        label="Cancel"
                    />
                </div>
            </form>
        </div>
    );
}


const mapDispatchToProps = dispatch => ({
    addMessage: (message, callback) => {
        dispatch(addMessage(message, callback))
    },
    updateMessage: (message, callback) => {
        dispatch(updateMessage(message, callback))
    }
});

export default connect(null, mapDispatchToProps)(MessageForm);