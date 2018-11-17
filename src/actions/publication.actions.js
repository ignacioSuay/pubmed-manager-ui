/**
 * action types
 */

// export const LOADING_PUBLICATIONS = 'LOADING_PUBLICATION';
export const LOADED_PUBLICATIONS = 'LOADED_PUBLICATION';

export const ADD_PUBLICATION = 'ADD_PUBLICATION';
export const REMOVE_PUBLICATION = 'REMOVE_PUBLICATION';

/**
 * action creators
 */

export function addPublication(publication) {
 return {
     type: ADD_PUBLICATION,
     publication
 }
}

export function removePublication(publicationId) {
    return {
        type: REMOVE_PUBLICATION,
        publicationId
    }
}

export function loadedPublications(publications){
    return {
        type: LOADED_PUBLICATIONS,
        publications
    }
}