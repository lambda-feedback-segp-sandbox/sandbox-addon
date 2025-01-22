import React from 'react';
import {Form} from './Form';

export function Remote() {
    function remoteEval(url: String, params: JSON) {
        console.log("remote eval");
        console.log(url);
        console.log(params);
        const answer = "Hello";
        const response = localStorage.getItem('response');
        console.log(response);

        const request = {"response": response, "answer": answer, "params": params};

        console.log(request);
    }
    return (
        <div>
            <h1>Remote Component</h1>
            <Form evalFunc={remoteEval}></Form>
        </div>
    );
};