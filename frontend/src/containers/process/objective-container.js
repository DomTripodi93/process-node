import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchObjectivesByDepartment } from '../../reducers/process/objective/objective.actions';
import ObjectiveNew from '../../components/process/objective/objective-new';
import Objectives from '../../components/process/objective/objectives';

import './process.styles.scss';


const ObjectiveContainer = (props) => {
    const [addMode, setAddMode] = useState(false);

    useEffect(() => {
        if (!props.objectivesCalled) {
            props.fetchObjectives(props.deptName);
        }
    }, [props]);

    const showObjectiveForm = () => {
        setAddMode(!addMode)
    }

    return (
        <div>
            <h3 className='centered'>Objectives</h3>
            <div className="grid100">
                <ObjectiveNew
                    deptName={props.deptName}
                    addMode={addMode}
                    action={showObjectiveForm} />
            </div>
            <br />
            {props.objectives[props.deptName] ?
                <Objectives
                    deptName={props.deptName}
                    objectives={props.objectives[props.deptName]} />
                :
                null
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchObjectives: (deptName) => dispatch(fetchObjectivesByDepartment(deptName))
    }
}

const mapStateToProps = state => ({
    objectives: state.objective.objectives,
    objectivesCalled: state.objective.called
});

export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveContainer);