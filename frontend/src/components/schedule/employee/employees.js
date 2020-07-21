import React from 'react';
import SingleEmployee from './single-employee';

const Employees = props => {

    return (
        <div>
            {props.employees.length > 0 ?
                <div className='flex'>
                    {props.employees.map(employee => (
                        <div
                            key={employee.employeeId}
                            className='sized30'>
                            <SingleEmployee
                                deptOptions={props.deptOptions}
                                employee={employee}
                                className='sized30' />
                        </div>
                    ))}
                </div>
                :
                <div className="border centered">
                    <h4 className="spaced">
                        You currently don't have any employees!
                    </h4>
                    <h4 className="spaced">
                        Add some employees using the button above to see them here.
                    </h4>
                </div>
            }
        </div>
    )
}


export default Employees;