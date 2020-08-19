import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchMessages } from '../../reducers/message/message.actions';


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
        <div>
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