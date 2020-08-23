import React, { useState, useEffect } from 'react';
import CustomButton from '../../shared/elements/button/custom-button.component';
import { connect } from 'react-redux';
import MessageForm from './message-form';
import { deleteMessage } from '../../reducers/message/message.actions';
import helpers from '../../shared/helpers';


const SingleMessage = props => {
    const [editMode, updateEditMode] = useState(false);
    const helper = new helpers();
    const date = helper.dateForDisplay(props.message.date);
    const time = helper.timeForDisplay(props.message.date.split("T")[1])

    const setEditMode = () => {
        updateEditMode(!editMode)
    }

    const handleDelete = () => {
        if (window.confirm(
            "Are you sure you want to delete this message?"
        )) {
            props.deleteMessage(
                props.message._id,
                props.page
            );
        }
    }

    return (
        <div className="middle">
            <div className='border spaced-msg'>
                {!editMode ?
                    <div>
                        <h5 className="shortened">{props.message.userName} - {date} {time}</h5>
                        {props.message.lastChangeName ?
                            <h5 className="shortened">Last Updated By: {props.message.lastChangeName}</h5>
                            :
                            null
                        }
                        <hr />
                        <h4 className="centered">{props.message.message}</h4>
                        {!props.change ?
                            <div className="grid50">
                                <CustomButton
                                    action={setEditMode}
                                    buttonStyle="blue"
                                    label="Edit" />
                                <CustomButton
                                    action={handleDelete}
                                    buttonStyle="red"
                                    label="Delete" />
                            </div>
                            :
                            null
                        }
                    </div>
                    :
                    <MessageForm
                        editMode={true}
                        messageInput={props.message}
                        callback={setEditMode} />
                }
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deleteBestPractice: (id, page) => dispatch(deleteMessage(id, page))
    }
}

export default connect(null, mapDispatchToProps)(SingleMessage);