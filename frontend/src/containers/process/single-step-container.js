import React, { useEffect } from 'react';
import { fetchSingleStep } from '../../reducers/process/step/step.actions';
import { connect } from 'react-redux';
import SingleStep from '../../components/process/step/single-step';

import './process.styles.scss';


const SingleStepContainer = props => {
    const deptName = props.match.params.deptName;
    const objectiveName = props.match.params.objectiveName;
    const stepNumber = props.match.params.stepNumber;

    useEffect(() => {
        if (
            stepNumber !== props.selectedStep.stepNumber ||
            deptName !== props.selectedStep.deptName ||
            objectiveName !== props.selectedStep.objectiveName
        ) {
            props.fetchSingleStep(stepNumber, objectiveName, deptName);
        }
    }, [props, deptName, objectiveName, stepNumber])

    return (
        <div>
            <SingleStep
                step={props.selectedStep}
                objectiveName={objectiveName}
                deptName={deptName}
                inDept={false} />
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSingleStep: (stepNumber, objectiveName, deptName) => dispatch(fetchSingleStep(stepNumber, objectiveName, deptName))
    }
}

const mapStateToProps = state => ({
    selectedStep: state.step.selectedStep
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleStepContainer);