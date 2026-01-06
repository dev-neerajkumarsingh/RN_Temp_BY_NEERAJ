import * as React from 'react';
import {
    StackActions,
    NavigationContainerRef,
    ParamListBase,
} from '@react-navigation/native';

export const navigationRef =
    React.createRef<NavigationContainerRef<ParamListBase>>();

type NavigationParams = Record<string, any>;

export const useNavs = {
    navigate: (name: string, params: NavigationParams = {}) => {
        navigationRef.current?.navigate(name, params);
    },

    reset: (
        state:
            | import('@react-navigation/native').NavigationState
            | import('@react-navigation/native').PartialState<
                import('@react-navigation/native').NavigationState
            >,
    ) => {
        navigationRef.current?.reset(state);
    },

    goback: () => {
        navigationRef.current?.goBack();
    },

    push: (name: string, params: NavigationParams = {}) => {
        navigationRef.current?.dispatch(StackActions.push(name, params));
    },

    replace: (name: string, params: NavigationParams = {}) => {
        navigationRef.current?.dispatch(StackActions.replace(name, params));
    },

    pop: (count: number = 1) => {
        navigationRef.current?.dispatch(StackActions.pop(count));
    },

    dispatch: (count: number) => {
        navigationRef.current?.dispatch(StackActions.pop(count));
    },
};