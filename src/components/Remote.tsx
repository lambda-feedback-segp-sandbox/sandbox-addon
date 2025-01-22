import React from 'react';
import {Form} from './Form';
import axios from "axios";

export function Remote() {
    async function remoteEval(url: string, params: JSON) {
        console.log("remote eval");
        console.log(url);
        console.log(params);
        const answer = "Hello";
        const response = localStorage.getItem('response');
        console.log(response);

        const request = {"response": response, "answer": answer, "params": params};

        const res = await axios.post(url, request, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }});
        console.log(res);
    }
    return (
        <div>
            <h1>Remote Component</h1>
            <Form evalFunc={remoteEval}></Form>
        </div>
    );
};