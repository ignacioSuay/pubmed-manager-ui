import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        margin: 10
    },
    input: {
        minWidth: 300,
        margin: 0,
        padding: 0,
    },
    basicFilters: {
        flex: 5,
    },
    filtersButtons: {
        padding: 10,
        margin: 10,
        alignSelf: 'flex-end'
    },
    plusFilter: {
        backgroundColor: '#2b80c4'
    },
    minusFilter: {
        padding: 10,
        color: '#ff3246'
    },
    search: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },

});
