import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchObjectivesByDepartment } from '../../reducers/process/objective/objective.actions';
import ObjectiveNew from '../../components/process/objective/objective-new';
import Objectives from '../../components/process/objective/objectives';

import './process.styles.scss';
import CustomButton from '../../shared/elements/button/custom-button.component';


const ObjectiveContainer = (props) => {
    const [addMode, setAddMode] = useState(false);
    const [page, setPage] = useState(1)

    useEffect(() => {
        if (!props.objectivesCalled) {
            props.fetchObjectives(props.deptName, page);
        }
    }, [props, page]);

    const showObjectiveForm = () => {
        setAddMode(!addMode)
    }

    const getNextObjectives = () => {
        props.fetchObjectives(props.deptName, page + 1);
        setPage(page + 1);
    }

    const getLastObjectives = () => {
        props.fetchObjectives(props.deptName, page - 1);
        setPage(page - 1);
    }

    const arrows = () => {
        return(
            <div className="size-holder">
                {props.moreResults[props.deptName] ?
                    <div className="grid-arrows">
                        {page > 1 ?
                            <CustomButton
                                action={getLastObjectives} 
                                label="&#8656;"
                                buttonStyle="blue arrow"/>
                            :
                            <div></div>
                        }
                        <div></div>
                        <CustomButton
                            action={getNextObjectives} 
                            label="&#8658;"
                            buttonStyle="blue arrow"/>
                    </div>
                    :
                    <div className="grid-arrows">
                        {page > 1 ?
                            <CustomButton
                                action={getLastObjectives} 
                                label="&#8656;"
                                buttonStyle="blue arrow"/>
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
                    <br/>
                    <Objectives
                        deptName={props.deptName}
                        objectives={props.objectives[props.deptName]} />
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
        fetchObjectives: (deptName, page) => dispatch(fetchObjectivesByDepartment(deptName, page))
    }
}

const mapStateToProps = state => ({
    objectives: state.objective.objectives,
    objectivesCalled: state.objective.called,
    moreResults: state.objective.moreResults
});

export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveContainer);