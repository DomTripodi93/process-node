import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchObjectivesByDepartment } from '../../reducers/process/objective/objective.actions';
import ObjectiveNew from '../../components/process/objective/objective-new';
import Objectives from '../../components/process/objective/objectives';

import './process.styles.scss';
import CustomButton from '../../shared/elements/button/custom-button.component';


const ObjectiveContainer = (props) => {
    const [addMode, setAddMode] = useState(false);
    const [page, setPage] = useState(1);
    const [moreResults, setMoreResults] = useState({});

    useEffect(() => {
        if (!props.objectivesCalled) {
            props.fetchObjectives(props.deptName, page, () => { setTimeout(setPage(1)) });
        } else if (moreResults[page] === undefined) {
            setMoreResults({ ...moreResults, [page]: props.moreResults[props.deptName] })
        }
    }, [props, page, moreResults]);

    const showObjectiveForm = () => {
        setAddMode(!addMode)
    }

    const getNextObjectives = () => {
        if (!props.objectives[props.deptName][page + 1]) {
            props.fetchObjectives(props.deptName, page + 1, () => { setPage(page + 1) });
        } else {
            setPage(page + 1)
        }
    }

    const getLastObjectives = () => {
        setPage(page - 1)
    }

    const arrows = () => {
        return (
            <div className="size-holder">
                {moreResults[page] ?
                    <div className="grid-arrows">
                        {page > 1 ?
                            <CustomButton
                                action={getLastObjectives}
                                label="&#8656;"
                                buttonStyle="blue arrow" />
                            :
                            <div></div>
                        }
                        <div></div>
                        <CustomButton
                            action={getNextObjectives}
                            label="&#8658;"
                            buttonStyle="blue arrow" />
                    </div>
                    :
                    <div className="grid-arrows">
                        {page > 1 ?
                            <CustomButton
                                action={getLastObjectives}
                                label="&#8656;"
                                buttonStyle="blue arrow" />
                            :
                            null
                        }
                    </div>
                }
            </div>
        )
    }

    return (
        <div>
            <h3 className='centered'>Objectives</h3>
            <div className="grid100">
                <ObjectiveNew
                    deptName={props.deptName}
                    addMode={addMode}
                    action={showObjectiveForm} />
            </div>
            <br />
            {props.objectives[props.deptName] ?
                <div>
                    {arrows()}
                    <br />
                    <Objectives
                        deptName={props.deptName}
                        objectives={props.objectives[props.deptName][page]}
                        page={page} />
                    {arrows()}
                </div>
                :
                null
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchObjectives: (deptName, page, callback) => dispatch(fetchObjectivesByDepartment(deptName, page, callback))
    }
}

const mapStateToProps = state => ({
    objectives: state.objective.objectives,
    objectivesCalled: state.objective.called,
    moreResults: state.objective.moreResults
});

export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveContainer);