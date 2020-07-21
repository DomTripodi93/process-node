import React from 'react';
import SingleCommonDifficulty from './single-common-difficulty';

const CommonDifficulties = props => {
    return (
        <div>
            {props.commonDifficulties.length > 0 ?
                <div>
                    <div className='grid50-to-100'>
                        {props.commonDifficulties.map(commonDifficulty => (
                            <div
                                key={commonDifficulty.id}
                            >
                                <SingleCommonDifficulty
                                    commonDifficulty={commonDifficulty}
                                    inDept={true} />
                                <br />
                            </div>
                        ))}
                    </div>
                </div>
                :
                <div className="border centered">
                    <h4 className="spaced">
                        You currently don't have any common difficulties!
                    </h4>
                    <h4 className="spaced">
                        Add some common difficulties using the button above to see them here.
                    </h4>
                </div>
            }
        </div>
    )
}


export default CommonDifficulties;