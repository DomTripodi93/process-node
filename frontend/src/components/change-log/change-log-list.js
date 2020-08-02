import React from 'react';
import helpers from '../../shared/helpers';


const ChangeLogList = props => {
    const helper = new helpers()
    return (
        <div>
            {props.changes && props.changes.length > 0 ?
                <div>
                    {props.changes.map(change => (
                        <div key={change._id} className="centered">
                            <h5>
                                Edited by {change.userId.substring(19)}: {change.userName + ", "}
                                at {helper.timeForDisplay(helper.timeFromDate(change.timeUpdated)) + " "}
                                on {helper.dateForDisplay(change.timeUpdated)}
                            </h5>
                            <div className="grid50">
                                
                            </div>
                        </div>
                    ))}
                </div>
                :
                <div>
                    <h4>No Changes Logged for {props.model}</h4>
                </div>
            }
        </div>
    )
}

export default ChangeLogList;