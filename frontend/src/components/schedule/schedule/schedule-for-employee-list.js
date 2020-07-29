import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import SingleScheduledTask from './single-scheduled-task';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import ScheduleDetail from './schedule-detail';
import { getSingleObjectiveForEmployee } from "../../../reducers/process/objective/objective.actions";
import { fetchStepsForEmployee } from "../../../reducers/process/step/step.actions";
import { fetchBestPracticesForEmployee } from '../../../reducers/process/best-practice/best-practice.actions';
import { fetchCommonDifficultiesForEmployee } from '../../../reducers/process/common-difficulty/common-difficulty.actions';


const ScheduleForEmployeeList = props => {
    const getObjective = props.getObjective;
    const objectives = props.objectives;
    const getSteps = props.getSteps;
    const getCommonDifficulties = props.getCommonDifficulties;
    const getBestPractices = props.getBestPractices;
    const scheduledTasks = props.scheduledTasks;

    useEffect(() => {
        if (scheduledTasks) {
            fetchObjective();
        }
    }, [getObjective, scheduledTasks])

    function fetchObjective() {
        let called = {}
        let objCount = 0;
        if (scheduledTasks.length > 0) {
            scheduledTasks.forEach(task => {
                objCount++
                if (!called[task.deptName + "-" + task.objectiveName]) {
                    getObjective(task.deptName, task.objectiveName, task._id);
                    called[task.deptName + "-" + task.objectiveName] = true;
                }
                if (objCount === scheduledTasks.length) {
                    fetchSteps(called);
                }
            })
        }
    }

    function fetchSteps(calls) {
        let objCount = 0;
        Object.keys(calls).forEach(call => {
            objCount++
            getSteps(...call.split("-"));
        })
    }

    const [detailsShown, setDetailsShown] = useState({})

    const detailsVisible = (id) => {
        let detailHold = { ...detailsShown };
        detailHold[id] = !detailHold[id];
        setDetailsShown(detailHold);
    }

    return (
        <div>
            <div className="grid-one-employee-user-button size-holder middle">
                <div className="grid-one-employee">
                    <div className="inner-border-left-header">
                        <h5 className="grid-header-text">Time</h5>
                    </div>
                    <div className="inner-border-left-header">
                        <h5 className="grid-header-text">Department</h5>
                    </div>
                    <div className="inner-border-left-header">
                        <h5 className="grid-header-text">Objective</h5>
                    </div>
                </div>
                <div className="inner-border-right-header"></div>
            </div>
            {scheduledTasks.map(scheduledTask => (
                <div
                    key={scheduledTask._id}
                    className="grid-one-employee-user-button size-holder middle">
                    {detailsShown[scheduledTask._id] ?
                        <ScheduleDetail
                            scheduledTask={scheduledTask}
                            objectives={props.objectives}
                            steps={props.steps}
                            commonDifficulties={props.commonDifficulties}
                            bestPractices={props.bestPractice} />
                        :
                        <SingleScheduledTask
                            objectives={props.objectives}
                            scheduledTask={scheduledTask}
                            employeeId="X"
                            year={props.year}
                            month={props.month}
                            day={props.day}
                            className='sized30' />
                    }
                    <div className="grid100 inner-border-right">
                        {detailsShown[scheduledTask._id] ?
                            <CustomButton
                                action={() => detailsVisible(scheduledTask._id)}
                                label="&#x25B3;"
                                buttonStyle="mini"
                            />
                            :
                            <CustomButton
                                action={() => detailsVisible(scheduledTask._id)}
                                label="&#x25BD;"
                                buttonStyle="mini"
                            />
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        getObjective: (deptName, objectiveName, key) => dispatch(getSingleObjectiveForEmployee(deptName, objectiveName, key)),
        getSteps: (deptName, objectiveName) => dispatch(fetchStepsForEmployee(deptName, objectiveName)),
        getBestPractices: (deptName, objectiveName, stepNumber) => dispatch(fetchBestPracticesForEmployee(deptName, objectiveName, stepNumber)),
        getCommonDifficulties: (deptName, objectiveName, stepNumber) => dispatch(fetchCommonDifficultiesForEmployee(deptName, objectiveName, stepNumber))
    }
}

const mapStateToProps = state => ({
    objectives: state.objective.objectives,
    objCalled: state.objective.called,
    steps: state.step.steps,
    stepsCalled: state.step.called,
    commonDifficulties: state.commonDifficulty.commonDifficultiesByStep,
    bestPractices: state.bestPractice.bestPracticesByStep
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleForEmployeeList);