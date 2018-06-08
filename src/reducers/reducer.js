function reducer(state, action) {

    if (state === undefined) {
        return {role: "anonymous"}
    }

    const role = state.role;

    switch (action.type) {
        case "ADD_ROLE":
            return {role: action.role};
        case "REMOVE_ROLE":
            return {role: ["anonymous"]};
        default:
            return role;
    }
}

export default reducer;
