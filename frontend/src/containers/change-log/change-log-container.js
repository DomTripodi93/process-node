import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchChanges } from '../../reducers/change-log/change-log.actions';
import helpers from '../../shared/helpers';
import ChangeLogList from '../../components/change-log/change-log-list';


const ChangeLogContainer = (props) => {
    const changeType = props.match.params.model;
    const helper = new helpers();
    const model = helper.capitalizeAll(helper.splitAtCaps(props.match.params.model));

    useEffect(() => {
        if (!props.changes[changeType]) {
            props.fetchChanges(changeType, 1);
        }
    }, [props, changeType]);

    return (
        <div>
            <h3 className="centered spaced">{model} Changes</h3>
            <ChangeLogList
                changes={props.changes[changeType]}
                model={props.match.params.model}/>
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