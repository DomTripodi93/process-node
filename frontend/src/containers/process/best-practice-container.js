import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchBestPracticesByStep } from '../../reducers/process/best-practice/best-practice.actions';
import BestPracticeNew from '../../components/process/best-practice/best-practice-new';
import BestPractices from '../../components/process/best-practice/best-practices';

import './process.styles.scss';


const BestPracticeContainer = (props) => {
    const [addMode, setAddMode] = useState(false);
    const fetchBestPractices = props.fetchBestPractices;
    const deptName = props.deptName;
    const objectiveName = props.objectiveName;
    const stepNumber = props.stepNumber;

    useEffect(() => {
        if (stepNumber) {
            fetchBestPractices(deptName, objectiveName, stepNumber);
        }
    }, [fetchBestPractices, deptName, objectiveName, stepNumber]);


    const showBestPracticeForm = () => {
        setAddMode(!addMode)
    }

    return (
        <div>
            <h3 className='centered'>Best Practices</h3>
            <div className="grid100">
                <BestPracticeNew
                    deptName={deptName}
                    objectiveName={objectiveName}
                    stepNumber={stepNumber}
                    addMode={addMode}
                    action={showBestPracticeForm} />
            </div>
            <br />
            {props.bestPractices ?
                <BestPractices
                    action={showBestPracticeForm}
                    bestPractices={props.bestPractices} />
                :
                null
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBestPractices: (deptName, objectiveName, stepNumber) => dispatch(fetchBestPracticesByStep(deptName, objectiveName, stepNumber))
    }
}

const mapStateToProps = state => ({
    bestPractices: state.bestPractice.bestPractices
});

export default connect(mapStateToProps, mapDispatchToProps)(BestPracticeContainer);