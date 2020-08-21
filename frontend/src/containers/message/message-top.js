import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchMessages } from '../../reducers/message/message.actions';
import MessageNew from '../../components/message/message-new';


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
        <div className="size-holder middle">
            <MessageNew 
            addMode={addMode}
            action={showMessageForm}/>
            top messages
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
    called: state.message.called
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageTopContainer);