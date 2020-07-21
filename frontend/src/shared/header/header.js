import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from '../../assets/favicon.png';
import './header.styles.scss';

import { toggleDropDown } from '../../reducers/drop-down/drop-down.reducer';

const Header = props => {
    const [authValue, setAuthValue] = useState(props.isAuthenticated);
    const [dropDownHidden, toggleDropDownHidden] = useState(props.hidden);

    const toggleDropDown = () => {
        if (dropDownHidden) {
            setTimeout(() => { props.toggleDropDown() }, 1);
        } else {
            props.toggleDropDown();
        }
    };

    useEffect(() => {
        setAuthValue(props.isAuthenticated);
        toggleDropDownHidden(props.hidden);
    }, [props]);

    const scheduleItems = [
        (<Link to='/schedule' className='drop-down-item' key='1'>
            Schedule
        </Link>),
        (<Link to='/employees' className='drop-down-item' key='2'>
            Employees
        </Link>)
    ]

    return (
        <div className='header-cover'>
            {authValue ?
                <div className='header'>
                    <Link to='/' className='logo-holder'>
                        <img className='logo-holder' alt='logo' src={logo}></img>
                    </Link>
                    <div className='routes'>
                        <Link to='/' className='route'>
                            Home
                        </Link>
                        <ul onClick={toggleDropDown} className='route'>
                            &#x21af; Schedule &#x21af;
                            {!dropDownHidden ?
                                <div className='drop-down grid100'>{scheduleItems}</div>
                                :
                                null
                            }
                        </ul>
                        <Link to='/departments' className='route'>
                            Departments
                        </Link>
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
    )
}

const mapDispatchToProps = dispatch => ({
    toggleDropDown: () => dispatch(toggleDropDown())
});

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated,
    hidden: state.dropDown.hidden
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);