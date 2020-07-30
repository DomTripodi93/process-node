import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { fetchCommonDifficultiesForEmployee } from '../../../reducers/process/common-difficulty/common-difficulty.actions';
import { fetchBestPracticesForEmployee } from '../../../reducers/process/best-practice/best-practice.actions';
import ScheduleSteps from './schedule-steps';
import helpers from '../../../shared/helpers';



const ScheduleDetail = props => {
    const helper = new helpers();
    const time = helper.timeForDisplay(helper.timeFromDate(props.scheduledTask.date));
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
                let key = step.deptName + "&" + step.objectiveName + "&" + step.stepNumber;
                if (!props.commonDifficulties[key]){
                    getCommonDifficulties(step.deptName, step.objectiveName, step.stepNumber);
                }
                if (!props.bestPractices[key]){
                    getBestPractices(step.deptName, step.objectiveName, step.stepNumber);
                }
            })
        }
    }

    return (
        <div className="inner-border-left">
            {objectives[deptName + "-" + objectiveName][0] ?
                <div>
                    <div className="grid-inner-schedule">
                        <h5>
                            {time}
                        </h5>
                        <h5>
                            {deptName} - {objectiveName}
                        </h5>
                        <h5>
                            Goal: {objectives[deptName + "-" + objectiveName][0].goal}
                        </h5>
                        <h5>
                            Time: {objectives[deptName + "-" + objectiveName][0].time} hours
                        </h5>
                    </div>
                    <ScheduleSteps 
                        steps={steps[deptName + "-" + objectiveName]}
                        commonDifficulties={props.commonDifficulties}
                        bestPractices={props.bestPractices} />
                </div>
                :
                <div>
                    <h3>Not a valid objective. Please consult your Manager</h3>
                </div>
            }
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