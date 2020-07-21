import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addScheduledTask, updateScheduledTask } from '../../../reducers/schedule/schedule/schedule.actions';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import FormInput from '../../../shared/elements/form-input/form-input.component';
import FormSelect from '../../../shared/elements/form-select/form-select.component';
import helpers from '../../../shared/helpers';



const ScheduledTaskForm = props => {
    const helper = new helpers();

    const [scheduledTaskInfo, setScheduledTaskInfo] = useState({
        employeeId: 1,
        employeeName: "Nobody",
        deptName: 'None',
        objectiveName: 'None',
        date: helper.setDateForIso(props.year, props.month, props.day) + "T07:00:00"
    });
    const {
        employeeId,
        deptName,
        objectiveName,
        date
    } = scheduledTaskInfo;

    const [options, setOptions] = useState({
        employeeIdOptions: [],
        deptOptions: [],
        objectiveOptions: [],
        objectiveOptionSets: {}
    })
    const {
        employeeIdOptions,
        deptOptions,
        objectiveOptions,
        objectiveOptionSets
    } = options;

    const intializeObjectiveOptionSets = (options) => {
        let newOptions = { None: [{ value: 'None', label: "None" }] };
        let keys = Object.keys(options);
        keys.forEach((key) => {
            newOptions[key] = options[key].map(option => {
                return { value: option.objectiveName, label: option.objectiveName };
            });
        });
        return newOptions;
    }

    useEffect(() => {
        if (props.employeeId) {
            setScheduledTaskInfo({ employeeId: props.employeeId })
        }
        if (props.scheduledTaskInput) {
            setScheduledTaskInfo(props.scheduledTaskInput);
            setOptions(options => {
                return {
                    ...options,
                    objectiveOptions: objectiveOptionSets[props.scheduledTaskInput.deptName]
                }
            })
        }
    }, [props, objectiveOptionSets])

    useEffect(() => {
        if (props.hasNeededData && deptOptions.length < 2) {
            setScheduledTaskInfo({
                employeeId: Object.keys(props.employeeMap)[0],
                employeeName: props.employeeMap[Object.keys(props.employeeMap)[0]],
                deptName: 'None',
                objectiveName: 'None',
                date: helper.setDateForIso(props.year, props.month, props.day) + "T07:00:00"
            });
            setOptions({
                employeeIdOptions: Object.keys(props.employeeMap)
                    .map(key => {
                        return { value: key, label: key + " - " + props.employeeMap[key] };
                    }),
                objectiveOptionSets: intializeObjectiveOptionSets(props.objectives),
                objectiveOptions: [{ value: 'None', label: "None" }],
                deptOptions: [
                    { value: "None", label: "None" },
                    ...Object.keys(props.objectives).map(key => {
                        return { value: key, label: key };
                    })
                ]
            });
        }
    }, [props, helper, deptOptions])

    const handleSubmit = async event => {
        event.preventDefault();
        let date = props.year + "/" + props.month + "/" + props.day

        if (props.editMode) {
            if (scheduledTaskInfo !== props.scheduledTaskInput) {
                props.updateScheduledTask(scheduledTaskInfo, props.callback, date, employeeId);
            } else {
                props.callback();
            }
        } else {
            props.addScheduledTask(scheduledTaskInfo, props.callback, date, employeeId);
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;

        if (name === "deptName") {
            setOptions({ ...options, objectiveOptions: objectiveOptionSets[value] })
            setScheduledTaskInfo({
                ...scheduledTaskInfo,
                deptName: value,
                objectiveName: objectiveOptionSets[value][0].value
            });
        } else if (name === "employeeId") {
            setScheduledTaskInfo({
                ...scheduledTaskInfo,
                employeeName: props.employeeMap[value],
                employeeId: value
            })
        } else {
            setScheduledTaskInfo({ ...scheduledTaskInfo, [name]: value });
        }
    };

    return (
        <div>
            {props.hasNeededData ?
                <div className='middle'>
                    {!props.editMode ?
                        <h3 className='centered'>
                            Fill out the form below to add an ScheduledTask
                        </h3>
                        :
                        <h3 className='centered'>
                            Edit the scheduled task below
                        </h3>
                    }
                    <form onSubmit={handleSubmit}>
                        <FormSelect
                            label="Employee"
                            name='employeeId'
                            value={employeeId}
                            options={employeeIdOptions}
                            onChange={handleChange}
                        />
                        <FormSelect
                            label="Department"
                            name='deptName'
                            value={deptName}
                            options={deptOptions}
                            onChange={handleChange}
                        />
                        <FormSelect
                            label="Objective"
                            name='objectiveName'
                            value={objectiveName}
                            options={objectiveOptions}
                            onChange={handleChange}
                        />
                        <FormInput
                            label='Date'
                            type='datetime-local'
                            name='date'
                            value={date}
                            onChange={handleChange}
                        />
                        <div className="grid50">
                            {!props.editMode ?
                                <CustomButton
                                    buttonStyle="blue"
                                    type="submit"
                                    label="Add"
                                />
                                :
                                <CustomButton
                                    buttonStyle="blue"
                                    type="submit"
                                    label="Update"
                                />
                            }
                            <CustomButton
                                buttonStyle="red"
                                action={props.callback}
                                label="Cancel"
                            />
                        </div>
                    </form>
                </div>
                :
                <div className="size-holder centered">
                    <h4>To start scheduling tasks add the following:</h4>
                    <h4>&#10547; One Employee</h4>
                    <h4>&#10547; One Department</h4>
                    <h4>&#10547; One Objective</h4>
                </div>
            }
        </div>
    );
}


const mapDispatchToProps = dispatch => ({
    addScheduledTask: (scheduledTask, callback) => {
        dispatch(addScheduledTask(scheduledTask, callback))
    },
    updateScheduledTask: (scheduledTask, callback) => {
        dispatch(updateScheduledTask(scheduledTask, callback))
    }
});


export default connect(null, mapDispatchToProps)(ScheduledTaskForm);