import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { fetchCommonDifficultiesForEmployee } from '../../../reducers/process/common-difficulty/common-difficulty.actions';
import { fetchBestPracticesForEmployee } from '../../../reducers/process/best-practice/best-practice.actions';



const ScheduleDetail = props => {
    const deptName = props.scheduledTask.deptName;
    const objectiveName = props.scheduledTask.objectiveName;
    const objectives = props.objectives;
    const steps = props.steps;

    useEffect(() => {
        if (steps[deptName + "-" + objectiveName]) {
            fetchCommonDifficultiesAndBestPractices(steps[deptName + "-" + objectiveName])
        }
    }, [steps, deptName, objectiveName])

    const getCommonDifficulties = props.getCommonDifficulties;
    const getBestPractices = props.getBestPractices;

    function fetchCommonDifficultiesAndBestPractices(steps) {
        if (steps.length > 0) {
            steps.forEach(step => {
                getCommonDifficulties(step.deptName, step.objectiveName, step.stepNumber);
                getBestPractices(step.deptName, step.objectiveName, step.stepNumber);
            })
        }
    }

    return (
        <div className="inner-border-left">
            <h4>{deptName} - {objectiveName}</h4>
        </div>
    )
}



const mapDispatchToProps = dispatch => {
    return {
        getBestPractices: (deptName, objectiveName, stepNumber) => dispatch(fetchBestPracticesForEmployee(deptName, objectiveName, stepNumber)),
        getCommonDifficulties: (deptName, objectiveName, stepNumber) => dispatch(fetchCommonDifficultiesForEmployee(deptName, objectiveName, stepNumber))
    }
}

const mapStateToProps = state => ({
    commonDifficulties: state.commonDifficulty.commonDifficultiesByStep,
    bestPractices: state.bestPractice.bestPracticesByStep
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDetail);