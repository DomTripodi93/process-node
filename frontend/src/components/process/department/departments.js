import React from 'react';
import SingleDepartment from './single-department';

const Departments = props => {

    return (
        <div>
            {props.departments.length > 0 ?
                <div className='flex'>
                    {props.departments.map(department => (
                        <div
                            key={department.deptName}
                            className='sized30'>
                            <SingleDepartment
                                department={department} />
                        </div>
                    ))}
                </div>
                :
                <div className="border centered">
                    <h4 className="spaced">
                        You currently don't have any departments!
                    </h4>
                    <h4 className="spaced">
                        Add some departments using the button above to see them here.
                    </h4>
                </div>
            }
        </div>
    )
}


export default Departments;