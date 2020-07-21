import React from 'react';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import ScheduleForm from './schedule-form';
import { Link } from 'react-router-dom';


const ScheduleNew = (props) => {
    return (
        <div>
            {props.addMode ?
                <div>
                    {props.employeeId ?
                        <div className='middle size-holder grid50'>
                            <div>
                            </div>
                            <Link
                                to={
                                    "/day/" +
                                    props.month + "/" +
                                    props.day + "/" +
                                    props.year
                                }
                                className="right-top">
                                <CustomButton
                                    label="Show Full Day"
                                    buttonStyle="blue" />
                            </Link>
                        </div>
                        :
                        null
                    }
                    <div className='border'>
                        <ScheduleForm
                            callback={props.action}
                            objectives={props.objectives}
                            employeeMap={props.employeeMap}
                            employeeId={props.employeeId}
                            year={props.year}
                            month={props.month}
                            day={props.day}
                            editMode={false}
                            hasNeededData={props.hasNeededData} />
                    </div>
                </div>
                :
                <div>
                    {props.employeeId ?
                        <div className='middle size-holder grid50'>
                            <div className='left-top'>
                                <CustomButton
                                    buttonStyle="blue"
                                    label="Add Schedules Task"
                                    action={props.action}
                                />
                            </div>
                            <Link
                                to={
                                    "/day/" +
                                    props.month + "/" +
                                    props.day + "/" +
                                    props.year
                                }
                                className="right-top">
                                <CustomButton
                                    label="Show Full Day"
                                    buttonStyle="blue" />
                            </Link>
                        </div>
                        :
                        <div className='middle size-holder grid50'>
                            <div className='left-top'>
                                <CustomButton
                                    buttonStyle="blue"
                                    label="Add Schedules Task"
                                    action={props.action}
                                />
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default ScheduleNew;