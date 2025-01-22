import React from 'react';
import {Form} from './Form';
import {useGlobals} from '@storybook/manager-api'

export function Remote() {
    const [globals, updateGlobals] = useGlobals();
    function remoteEval(url: String, params: JSON) {
        console.log("remote eval");
        console.log(url);
        console.log(params);
        const response = localStorage.getItem('response');
        console.log(response);
    }
    return (
        <div>
            <h1>Remote Component</h1>
            <Form evalFunc={remoteEval}></Form>
        </div>
    );
};