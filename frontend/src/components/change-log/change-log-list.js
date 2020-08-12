import React from 'react';
import helpers from '../../shared/helpers';
import ChangeLogAnyModel from './change-log-any-model';


const ChangeLogList = props => {
    const helper = new helpers();

    return (
        <div>
            {props.changes && props.changes.length > 0 ?
                <div className="size-holder middle">
                    {props.changes.map(change => (
                        <div key={change._id} className="centered top-border">
                            <h5>
                                Edited by {change.userName}({change.userId.substring(19)}), 
                                at {helper.timeForDisplay(helper.timeFromDate(change.timeUpdated)) + " "}
                                on {helper.dateForDisplay(change.timeUpdated)}
                            </h5>
                            <ChangeLogAnyModel
                                model={props.model}
                                data={[change.oldValues, change.newValues]} />
                            <br/>
                        </div>
                    ))}
                </div>
                :
                <div className="size-holder middle">
                    <h4 className="centered">No Changes Logged</h4>
                </div>
            }
        </div>
    )
}

export default ChangeLogList;