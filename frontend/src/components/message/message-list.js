import React from 'react';
import SingleMessage from './message-single';


const MessageList = props => {
    return (
        <div>
            {props.messages.length > 0 ?
                <div>
                    <div className='grid100'>
                        {props.messages.map(message => (
                            <div
                                key={message._id}
                            >
                                <SingleMessage 
                                    message={message}
                                    page={props.page}
                                    isRoot={props.isRoot} />
                            </div>
                        ))}
                    </div>
                </div>
                :
                <div className="border centered">
                    <h4 className="spaced-msg">
                        You currently don't have any messages!
                    </h4>
                </div>
            }
        </div>
    )
}


export default MessageList;