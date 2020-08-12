import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { fetchChanges } from '../../reducers/change-log/change-log.actions';
import helpers from '../../shared/helpers';
import ChangeLogList from '../../components/change-log/change-log-list';
import CustomButton from '../../shared/elements/button/custom-button.component';


const ChangeLogContainer = (props) => {
    const changeType = props.match.params.model;
    const helper = new helpers();
    const model = helper.capitalizeAll(helper.splitAtCaps(props.match.params.model));
    const [page, setPage] = useState(1);
    const [moreResults, setMoreResults] = useState({});

    useEffect(() => {
        if (!props.changes[changeType]) {
            props.fetchChanges(changeType, page, ()=>{});
        } else if (moreResults[page] === undefined) {
            setMoreResults({ ...moreResults, [page]: props.moreResults[changeType] })
        }
    }, [props, changeType, moreResults, page]);

    const getNextChanges = () => {
        if (!props.changes[changeType][page + 1]) {
            props.fetchChanges(changeType, page + 1, () => { setPage(page + 1) });
        } else {
            setPage(page + 1)
        }
    }

    const getLastChanges = () => {
        setPage(page - 1)
    }

    const arrows = () => {
        return (
            <div className="size-holder">
                {moreResults[page] ?
                    <div className="grid-arrows">
                        {page > 1 ?
                            <CustomButton
                                action={getLastChanges}
                                label="&#8656;"
                                buttonStyle="blue arrow" />
                            :
                            <div></div>
                        }
                        <div></div>
                        <CustomButton
                            action={getNextChanges}
                            label="&#8658;"
                            buttonStyle="blue arrow" />
                    </div>
                    :
                    <div className="grid-arrows">
                        {page > 1 ?
                            <CustomButton
                                action={getLastChanges}
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
            <h3 className="centered spaced">{model} Changes</h3>
            {props.changes[changeType] ?
                <div>
                    {arrows()}
                    <ChangeLogList
                        changes={props.changes[changeType][page]}
                        model={props.match.params.model}/>
                    {arrows()}
                </div>
                :
                null
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchChanges: (model, page, callback) => dispatch(fetchChanges(model, page, callback))
    }
}

const mapStateToProps = state => ({
    changes: state.changeLog.changes,
    moreResults: state.changeLog.moreResults
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeLogContainer);