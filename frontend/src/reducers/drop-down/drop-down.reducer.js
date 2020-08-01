const INITIAL_STATE = {
    hiddenSchedule: true,
    hiddenChanges: true
};

const DropDownAction = { 
    TOGGLE_DROP_DOWN: 'TOGGLE_DROP_DOWN',
    TOGGLE_ALL_HIDDEN: 'TOGGLE_ALL_HIDDEN'
};

export const toggleDropDown = (changed) => {
    return { 
        type: DropDownAction.TOGGLE_DROP_DOWN,
        changed
    }
}

export const toggleAllHidden = () => {
    return {
        type: DropDownAction.TOGGLE_ALL_HIDDEN
    }
}

export const dropDownReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DropDownAction.TOGGLE_DROP_DOWN:
            let schedule = state.hiddenSchedule;
            let changes = state.hiddenChanges;
            if (action.changed === "schedule"){
                schedule = !schedule;
            } else if (action.changed === "changes"){
                changes = !changes
            }
            return {
                hiddenSchedule: schedule,
                hiddenChanges: changes
            }
        case DropDownAction.TOGGLE_ALL_HIDDEN:
            return {
                hiddenSchedule: true,
                hiddenChanges: true
            }
        default:
            return state;
    }
}