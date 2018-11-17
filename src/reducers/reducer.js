import {ADD_PUBLICATION, LOADED_PUBLICATIONS, REMOVE_PUBLICATION} from "../actions/publication.actions";

const initialState = {
    publications: []
};


function reducer(state, action) {

    if (state === undefined) {
        return initialState;
    }

    switch (action.type) {
        case ADD_PUBLICATION:
            return Object.assign({}, state, {
                publications: [...state.publications, action.publication]
            });
        case REMOVE_PUBLICATION:
            let assign = Object.assign({}, state, {
                publications: state.publications.filter(pub => pub.pubmedId !== action.publicationId)
            });
            return assign;
        case LOADED_PUBLICATIONS:
            return Object.assign({}, state, {
                publications: action.publications
            });
        default:
            return state;
    }
}

export default reducer;
