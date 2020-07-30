import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import SingleScheduledTask from '../schedule/single-scheduled-task';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import ScheduleDetail from './schedule-detail';
import { getSingleObjectiveForEmployee } from "../../../reducers/process/objective/objective.actions";
import { fetchStepsForEmployee } from "../../../reducers/process/step/step.actions";


const ScheduleForEmployeeList = props => {
    const getObjective = props.getObjective;
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
                objCount++;
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

    const getSteps = props.getSteps;

    function fetchSteps(calls) {
        Object.keys(calls).forEach(call => {
            getSteps(...call.split("-"));
        })
    }

    const [detailsShown, setDetailsShown] = useState({})

    const detailsVisible = (id) => {
        let detailHold = { ...detailsShown };
        detailHold[id] = !detailHold[id];
        setDetailsShown(detailHold);
    }

    const listItem = (scheduledTask) => {
        return (
            <div className="grid-one-employee-user-button size-holder middle">
                {detailsShown[scheduledTask._id] ?
                    <ScheduleDetail
                        action={() => detailsVisible(scheduledTask._id)}
                        scheduledTask={scheduledTask}
                        objectives={props.objectives}
                        steps={props.steps}
                        date={props.date} />
                    :
                    <SingleScheduledTask
                        objectives={props.objectives}
                        scheduledTask={scheduledTask}
                        className='sized30'
                        isRoot={props.isRoot} />
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
        )
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
                <div key={scheduledTask._id}>
                    {scheduledTask.status === "Scheduled" ?
                        <div className="orange-back">
                            {listItem(scheduledTask)}
                        </div>
                        :
                        <div>
                            {scheduledTask.status === "Read" ?
                                <div className="blue-back">
                                    {listItem(scheduledTask)}
                                </div>
                                :
                                <div className="green-back">
                                    {listItem(scheduledTask)}
                                </div>
                            }
                        </div>
                    }
                </div>
            ))}
        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        getObjective: (deptName, objectiveName, key) => dispatch(getSingleObjectiveForEmployee(deptName, objectiveName, key)),
        getSteps: (deptName, objectiveName) => dispatch(fetchStepsForEmployee(deptName, objectiveName)),
    }
}

const mapStateToProps = state => ({
    objectives: state.objective.objectives,
    steps: state.step.employeeSteps,
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleForEmployeeList);