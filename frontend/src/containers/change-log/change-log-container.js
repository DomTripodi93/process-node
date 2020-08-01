import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchChanges } from '../../reducers/change-log/change-log.actions';


const ChangeLogContainer = (props) => {
    useEffect(() => {
        if (!props.changes[props.match.params.model]) {
            props.fetchChanges(props.match.params.model);
        }
    }, [props]);

    return (
        <div>
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