import React from 'react';

const MessageList = props => {
    return (
        <div>
            {props.messages.length > 0 ?
                <div>
                    <div className='grid50-to-100'>
                        {props.messages.map(message => (
                            <div
                                key={message._id}
                            >
                                {message.message}
                            </div>
                        ))}
                    </div>
                </div>
                :
                <div className="border centered">
                    <h4 className="spaced">
                        You currently don't have any messages!
                    </h4>
                </div>
            }
        </div>
    )
}


export default MessageList;