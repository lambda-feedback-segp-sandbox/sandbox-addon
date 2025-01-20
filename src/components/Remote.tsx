import React from 'react';
import {Form} from './Form';

export function Remote() {
    function remoteEval(url: String, schema: JSON) {
        console.log("remote eval");
        console.log(url);
    }
    return (
        <div>
            <h1>Remote Component</h1>
            <Form evalFunc={remoteEval}></Form>
        </div>
    );
};