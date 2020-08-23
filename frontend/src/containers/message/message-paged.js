import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import CustomButton from '../../shared/elements/button/custom-button.component';
import { fetchNextMessages } from '../../reducers/message/message.actions';
import MessageList from '../../components/message/message-list';


const MessagePagedContainer = (props) => {
    const [page, setPage] = useState(1);
    const [moreResults, setMoreResults] = useState({});

    useEffect(() => {
        if (!props.called[page]) {
            props.fetchMessages(page, () => { });
        } else if (moreResults[page] === undefined) {
            setMoreResults({ ...moreResults, [page]: props.moreResults[page] });
        }
    }, [props, page, moreResults]);

    const getNextMessages = () => {
        if (!props.messages[page + 1]) {
            props.fetchMessages(page + 1, () => { setPage(page + 1) });
        } else {
            setPage(page + 1);
        }
    }

    const getLastMessages = () => {
        setPage(page - 1);
    }

    const arrows = () => {
        return (
            <div className="size-border middle">
                {moreResults[page] ?
                    <div className="grid-arrows">
                        {page > 1 ?
                            <CustomButton
                                action={getLastMessages}
                                label="&#8656;"
                                buttonStyle="blue arrow" />
                            :
                            <div></div>
                        }
                        <div></div>
                        <CustomButton
                            action={getNextMessages}
                            label="&#8658;"
                            buttonStyle="blue arrow" />
                    </div>
                    :
                    <div className="grid-arrows">
                        {page > 1 ?
                            <CustomButton
                                action={getLastMessages}
                                label="&#8656;"
                                buttonStyle="blue arrow" />
                            :
                            null
                        }
                    </div>
                }
            </div>
        )
    }

    return (
        <div>
        {props.messages[page] ?
            <div className="spaced-msg">
                {arrows()}
                <MessageList
                    messages={props.messages[page]}
                    page={page} />
            </div>
            :
            null
        }
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchMessages: (page, callback) => dispatch(fetchNextMessages(page, callback))
    }
}

const mapStateToProps = state => ({
    messages: state.message.messages,
    called: state.message.called,
    moreResults: state.message.moreResults
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagePagedContainer);