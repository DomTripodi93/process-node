import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchObjectivesByDepartment } from '../../reducers/process/objective/objective.actions';
import ObjectiveNew from '../../components/process/objective/objective-new';
import Objectives from '../../components/process/objective/objectives';

import './process.styles.scss';
import CustomButton from '../../shared/elements/button/custom-button.component';


const ObjectiveContainer = (props) => {
    const [addMode, setAddMode] = useState(false);
    const [page, setPage] = useState(1)

    useEffect(() => {
        if (!props.objectivesCalled) {
            props.fetchObjectives(props.deptName, page);
        }
    }, [props, page]);

    const showObjectiveForm = () => {
        setAddMode(!addMode)
    }

    const getMoreObjectives = () => {
        props.fetchObjectives(props.deptName, page + 1);
        setPage(page + 1);
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
                <div>
                    <Objectives
                        deptName={props.deptName}
                        objectives={props.objectives[props.deptName]} />
                    <CustomButton
                        action={getMoreObjectives} 
                        label="More Objectives"
                        style="soft-green"/>
                </div>
                :
                null
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchObjectives: (deptName, page) => dispatch(fetchObjectivesByDepartment(deptName, page))
    }
}

const mapStateToProps = state => ({
    objectives: state.objective.objectives,
    objectivesCalled: state.objective.called
});

export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveContainer);