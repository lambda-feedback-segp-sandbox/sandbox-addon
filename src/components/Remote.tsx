import React from 'react';
import {Form} from './Form';
import fetch from 'node-fetch';

export function Remote() {
    async function remoteEval(url: string, params: JSON) {
        console.log("remote eval");
        console.log(url);
        console.log(params);
        const answer = "Hello";
        const response = localStorage.getItem('response');
        console.log(response);

        const request = {"response": response, "answer": answer, "params": params};

        console.log(request);

        const httpresp = await fetch(new URL(url), {
            method: 'post',
            body: JSON.stringify(request),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await httpresp.json();

        console.log(data);
    }
    return (
        <div>
            <h1>Remote Component</h1>
            <Form evalFunc={remoteEval}></Form>
        </div>
    );
};