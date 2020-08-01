const INITIAL_STATE = {
    hiddenSchedule: true,
    hiddenChanges: true
};

const DropDownAction = { TOGGLE_DROP_DOWN: 'TOGGLE_DROP_DOWN' };

export const toggleDropDown = (changed) => {
    return { 
        type: DropDownAction.TOGGLE_DROP_DOWN,
        changed
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
        default:
            return state;
    }
}