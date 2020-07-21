import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCommonDifficultiesByStep } from '../../reducers/process/common-difficulty/common-difficulty.actions';
import CommonDifficultyNew from '../../components/process/common-difficulty/common-difficulty-new';
import CommonDifficulties from '../../components/process/common-difficulty/common-difficulties';

import './process.styles.scss';


const CommonDifficultyContainer = (props) => {
    const [addMode, setAddMode] = useState(false);
    const fetchCommonDifficulties = props.fetchCommonDifficulties;
    const deptName = props.deptName;
    const objectiveName = props.objectiveName;
    const stepNumber = props.stepNumber;

    useEffect(() => {
        if (stepNumber) {
            fetchCommonDifficulties(deptName, objectiveName, stepNumber);
        }
    }, [fetchCommonDifficulties, deptName, objectiveName, stepNumber]);


    const showCommonDifficultyForm = () => {
        setAddMode(!addMode)
    }

    return (
        <div>
            <h3 className='centered'>Common Difficulties</h3>
            <div className="grid100">
                <CommonDifficultyNew
                    deptName={deptName}
                    objectiveName={objectiveName}
                    stepNumber={stepNumber}
                    addMode={addMode}
                    action={showCommonDifficultyForm} />
            </div>
            <br />
            {props.commonDifficulties ?
                <CommonDifficulties
                    action={showCommonDifficultyForm}
                    commonDifficulties={props.commonDifficulties} />
                :
                null
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCommonDifficulties: (deptName, objectiveName, stepNumber) => dispatch(fetchCommonDifficultiesByStep(deptName, objectiveName, stepNumber))
    }
}

const mapStateToProps = state => ({
    commonDifficulties: state.commonDifficulty.commonDifficulties
});

export default connect(mapStateToProps, mapDispatchToProps)(CommonDifficultyContainer);