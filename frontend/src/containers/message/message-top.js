import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import "./message.styles.scss";
import { fetchMessages } from '../../reducers/message/message.actions';
import MessageNew from '../../components/message/message-new';
import MessageList from '../../components/message/message-list';


const MessageTopContainer = (props) => {
    const [addMode, setAddMode] = useState(false);

    useEffect(() => {
        if (!props.called["top"]) {
            props.fetchMessages();
        }
    }, [props]);

    const showMessageForm = () => {
        setAddMode(!addMode);
    }

    return (
        <div className="middle">
            {props.isRoot ? 
                <MessageNew
                    addMode={addMode}
                    action={showMessageForm} />
                :
                null
            }
            <MessageList
                messages={props.messages}
                page={"top"}
                isRoot={props.isRoot} />
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchMessages: () => dispatch(fetchMessages())
    }
}

const mapStateToProps = state => ({
    messages: state.message.topMessages,
    called: state.message.called,
    isRoot: state.schedule.isRoot
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageTopContainer);