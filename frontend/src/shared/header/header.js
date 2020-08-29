import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from '../../assets/favicon.png';
import './header.styles.scss';

import { toggleDropDown } from '../../reducers/drop-down/drop-down.reducer';

const Header = props => {
    const [authValue, setAuthValue] = useState(props.isAuthenticated);
    const [rootValue, setRootValue] = useState(props.isRoot);
    const [dropDownHidden, toggleDropDownHidden] = useState({
        schedule: props.hiddenSchedule,
        changes: props.hiddenChanges
    });
    const date = new Date();
    const today = "/day/" + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();

    const toggleDropDown = (changed) => {
        if (dropDownHidden[changed]) {
            setTimeout(() => { props.toggleDropDown(changed) }, 1);
        } else {
            props.toggleDropDown(changed);
        }
    };

    useEffect(() => {
        setAuthValue(props.isAuthenticated);
        setRootValue(props.isRoot);
        toggleDropDownHidden({
            schedule: props.hiddenSchedule,
            changes: props.hiddenChanges
        });
    }, [props]);

    const scheduleItems = [
        (<Link to='/schedule' className='drop-down-item' key='1'>
            Schedule
        </Link>),
        (<Link to='/employees' className='drop-down-item' key='2'>
            Employees
        </Link>)
    ]

    const changeItems = [
        (<Link to='/changes/department' className='drop-down-item' key='1'>
            Department
        </Link>),
        (<Link to='/changes/objective' className='drop-down-item' key='2'>
            Objective
        </Link>),
        (<Link to='/changes/step' className='drop-down-item' key='3'>
            Step
        </Link>),
        (<Link to='/changes/bestPractice' className='drop-down-item' key='4'>
            Best Practice
        </Link>),
        (<Link to='/changes/commonDifficulty' className='drop-down-item' key='5'>
            Common Difficulty
        </Link>),
        (<Link to='/changes/schedule' className='drop-down-item' key='6'>
            Schedule
        </Link>),
        (<Link to='/changes/message' className='drop-down-item' key='7'>
            Message
        </Link>)
    ]

    return (
        <div className='header-cover'>
            {rootValue ?
                <div className='header'>
                    <Link to='/' className='logo-holder'>
                        <img className='logo-holder' alt='logo' src={logo}></img>
                    </Link>
                    <div className='routes'>
                        <Link to='/' className='route'>
                            Home
                        </Link>
                        <ul onClick={() => {toggleDropDown("schedule")}} className='route'>
                            Schedule &#x21af;
                            {!dropDownHidden["schedule"] ?
                                <div className='drop-down grid100'>{scheduleItems}</div>
                                :
                                null
                            }
                        </ul>
                        <Link to='/departments' className='route'>
                            Departments
                        </Link>
                        <ul onClick={() => {toggleDropDown("changes")}} className='route'>
                            Changes &#x21af;
                            {!dropDownHidden["changes"] ?
                                <div className='drop-down grid100'>{changeItems}</div>
                                :
                                null
                            }
                        </ul>
                    </div>
                    <div className='edge'>
                        <Link to='/signout' className='route'>
                            Log Out
                        </Link>
                    </div>
                </div>
                :
                <div>
                    {authValue ? 
                        <div className='header'>
                            <Link to='/' className='logo-holder'>
                                <img className='logo-holder' alt='logo' src={logo}></img>
                            </Link>
                            <div className='routes'>
                                <Link to='/' className='route'>
                                    Home
                                </Link>
                                <Link to={today} className='route'>
                                    Today
                                </Link>
                                {props.canEdit ?
                                    <Link to='/schedule' className='route'>
                                        Schedule
                                    </Link>
                                    :
                                    null
                                }
                                {props.canEdit ?
                                    <Link to='/departments' className='route'>
                                        Departments
                                    </Link>
                                    :
                                    null
                                }
                                {props.canEdit ?
                                    <ul onClick={() => {toggleDropDown("changes")}} className='route'>
                                        Changes &#x21af;
                                        {!dropDownHidden["changes"] ?
                                            <div className='drop-down grid100'>{changeItems}</div>
                                            :
                                            null
                                        }
                                    </ul>
                                    :
                                    null
                                }
                            </div>
                            <div className='edge'>
                                <Link to='/signout' className='route'>
                                    Log Out
                                </Link>
                            </div>
                        </div>
                        :
                        <div className='header'>
                            <Link to='/' className='logo-holder'>
                                <img className='logo-holder' alt='logo' src={logo}></img>
                            </Link>
                            <div className='routes'>
                                <Link to='/' className='route'>
                                    Home
                                </Link>
                                <Link to='/register' className='route'>
                                    Sign Up
                                </Link>
                                <Link to='/signin' className='route'>
                                    Sign In
                                </Link>
                            </div>
                            <div className='edge'></div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    toggleDropDown: (changed) => dispatch(toggleDropDown(changed))
});

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated,
    isRoot: state.user.isRoot,
    canEdit: state.user.canEdit,
    hiddenSchedule: state.dropDown.hiddenSchedule,
    hiddenChanges: state.dropDown.hiddenChanges
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);