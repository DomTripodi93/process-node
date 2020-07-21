import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStepsByDepartmentAndObjective } from '../../reducers/process/step/step.actions';
import StepNew from '../../components/process/step/step-new';
import Steps from '../../components/process/step/steps';

import './process.styles.scss';


const StepContainer = (props) => {
    const [addMode, setAddMode] = useState(false);
    const fetchSteps = props.fetchSteps;
    const deptName = props.deptName;
    const objectiveName = props.objectiveName;
    const called = props.called;
    const steps = props.steps
    const [stepsToPass, setSteps] = useState([]);

    useEffect(() => {
        if (objectiveName) {
            if (!called[deptName + "-" + objectiveName]) {
                fetchSteps(deptName, objectiveName);
            } else {
                setSteps(steps[deptName][objectiveName]);
            }
        }
    }, [fetchSteps, deptName, objectiveName, steps, called]);


    const showStepForm = () => {
        setAddMode(!addMode)
    }

    return (
        <div>
            <h3 className='centered'>Steps</h3>
            <div className="grid100">
                <StepNew
                    deptName={deptName}
                    objectiveName={objectiveName}
                    addMode={addMode}
                    action={showStepForm} />
            </div>
            <br />
            {props.steps ?
                <Steps
                    deptName={deptName}
                    objectiveName={objectiveName}
                    action={showStepForm}
                    steps={stepsToPass} />
                :
                null
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSteps: (deptName, objectiveName) => dispatch(fetchStepsByDepartmentAndObjective(deptName, objectiveName))
    }
}

const mapStateToProps = state => ({
    steps: state.step.steps,
    called: state.step.called
});

export default connect(mapStateToProps, mapDispatchToProps)(StepContainer);