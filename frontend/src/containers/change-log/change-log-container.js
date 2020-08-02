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
            props.fetchChanges(changeType);
        }
    }, [props, changeType]);

    return (
        <div>
            <h3 className="centered">{model} Changes</h3>
            <ChangeLogList
                changes = {props.changes[changeType]}/>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchChanges: (model) => dispatch(fetchChanges(model))
    }
}

const mapStateToProps = state => ({
    changes: state.changeLog.changes
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeLogContainer);