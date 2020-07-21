import React, { useEffect } from 'react';
import { fetchSingleObjective } from '../../reducers/process/objective/objective.actions';
import { connect } from 'react-redux';
import SingleObjective from '../../components/process/objective/single-objective';

import './process.styles.scss';


const SingleObjectiveContainer = props => {
    const deptName = props.match.params.deptName;
    const objectiveName = props.match.params.objectiveName;

    useEffect(() => {
        if (
            objectiveName !== props.selectedObjective.objectiveName ||
            deptName !== props.selectedObjective.deptName
        ) {
            props.fetchSingleObjective(objectiveName, deptName);
        }
    }, [props, deptName, objectiveName])

    return (
        <div>
            <SingleObjective
                objective={props.selectedObjective}
                deptName={deptName}
                inDept={false} />
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSingleObjective: (objectiveName, deptName) => dispatch(fetchSingleObjective(objectiveName, deptName))
    }
}

const mapStateToProps = state => ({
    selectedObjective: state.objective.selectedObjective
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleObjectiveContainer);