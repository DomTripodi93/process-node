import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteSchedule } from '../../../reducers/schedule/schedule/schedule.actions';
import ScheduledTaskForm from './schedule-form';
import ScheduleNone from './schedule-none';
import ScheduleEmployeeList from './schedule-employee-list';
import ScheduleList from './schedule-list';



const ScheduleDay = props => {
    const [editMode, updateEditMode] = useState(false);
    const [selectedTask, setSelectedTask] = useState("");

    const setEditMode = (task) => {
        setSelectedTask(task);
        updateEditMode(!editMode);
    }

    const handleDelete = (task) => {
        if (window.confirm(
            "Are you sure you want to delete this scheduled task: " + task.objectiveName + "?"
        )) {
            let date = props.year + "-" + props.month + "-" + props.day;
            props.deleteSchedule(task._id, date, task.employeeId);
        }
    }

    return (
        <div>
            {editMode ?
                <div>
                    <div className="border">
                        <ScheduledTaskForm
                            callback={setEditMode}
                            objectives={props.objectives}
                            employeeMap={props.employeeMap}
                            employeeId={props.employeeId}
                            editMode={editMode}
                            scheduledTaskInput={selectedTask}
                            year={props.year}
                            month={props.month}
                            day={props.day}
                            hasNeededData={props.hasNeededData} />
                    </div>
                    <br />
                </div>
                :
                null
            }
            {props.scheduledTasks && props.scheduledTasks.length > 0 ?
                <div>
                    {props.employeeId ?
                        <ScheduleEmployeeList
                            scheduledTasks={props.scheduledTasks}
                            objectives={props.objectives}
                            employeeMap={props.employeeMap}
                            employeeId={props.employeeId}
                            year={props.year}
                            month={props.month}
                            day={props.day}
                            handleEdit={setEditMode}
                            handleDelete={handleDelete}
                            />
                        :
                        <ScheduleList
                            scheduledTasks={props.scheduledTasks}
                            objectives={props.objectives}
                            employeeMap={props.employeeMap}
                            employeeId={props.employeeId}
                            year={props.year}
                            month={props.month}
                            day={props.day}
                            handleEdit={setEditMode}
                            handleDelete={handleDelete}
                            />
                    }
                </div>
                :
                <ScheduleNone
                    employeeId={props.employeeId}
                    employeeMap={props.employeeMap}
                    month={props.month}
                    day={props.day}
                    year={props.year} />
            }
        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        deleteSchedule: (id, date, employeeId) => dispatch(deleteSchedule(id, date, employeeId))
    }
}


export default connect(null, mapDispatchToProps)(ScheduleDay);