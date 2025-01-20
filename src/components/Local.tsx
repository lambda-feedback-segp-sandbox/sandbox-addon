import React from 'react';
import {Form} from './Form';

export function Local() {
    function localEval(url: String, schema: JSON) {
        console.log("local eval");
        console.log(url);
    }
    return (
        <div>
            <h1>Local Component</h1>
            <Form evalFunc={localEval}></Form>
        </div>
    );
};