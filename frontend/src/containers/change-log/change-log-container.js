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

    useEffect(() => {
        console.log(props.moreResults)
        if (!props.changes[changeType]) {
            props.fetchChanges(changeType, page, ()=>{});
        }
    }, [props, changeType]);

    return (
        <div>
            <h3 className="centered spaced">{model} Changes</h3>
            {props.changes[changeType] ?
                <ChangeLogList
                    changes={props.changes[changeType][page]}
                    model={props.match.params.model}/>
                :
                null
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchChanges: (model, page) => dispatch(fetchChanges(model, page))
    }
}

const mapStateToProps = state => ({
    changes: state.changeLog.changes
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeLogContainer);