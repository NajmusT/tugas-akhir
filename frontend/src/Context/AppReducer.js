import SchoolActionTypes from "../Constants/ActionTypes/SchoolActionTypes"

export default (state, action) => {
    switch (action.type) {
        case SchoolActionTypes.ADD_SCHOOL:
            return {
                schools: [action.payload, ...state.schools]
            }

        case SchoolActionTypes.REMOVE_SCHOOL:
            return {
                users: state.users.filter(user => {
                    return user.id !== action.payload
                })
            }

        case SchoolActionTypes.EDIT_SCHOOL:
            const updateSchool = action.payload
            const updatedSchools = state.schools.map(school => {
                if (school.id === updateSchool.id) {
                    return updateSchool;
                }
                return school
            })

            return {
                users: updatedSchools
            }

        default:
            return state;
    }
}