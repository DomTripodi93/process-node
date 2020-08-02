import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchChanges } from '../../reducers/change-log/change-log.actions';
import helpers from '../../shared/helpers';


const ChangeLogContainer = (props) => {
    const helper = new helpers();
    const model = helper.capitalizeAll(helper.splitAtCaps(props.match.params.model));

    useEffect(() => {
        if (!props.changes[props.match.params.model]) {
            props.fetchChanges(props.match.params.model);
        }
    }, [props]);

    return (
        <div>
            <h3 className="centered">{model} Changes</h3>
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