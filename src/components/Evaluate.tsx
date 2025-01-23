import React, { useState } from 'react';
import {Form} from './Form';
import axios from "axios";

export function Evaluate() {
    const [response, updateResponse] = useState<string>('');
    async function evaluate(url: string, params: JSON) {
        console.log("remote eval");
        console.log(url);
        console.log(params);
        const answer = localStorage.getItem('answer');
        
        const response = localStorage.getItem('response');
        console.log(response);

        const request = {"response": response, "answer": answer, "params": params};
        
        const res = await axios.post(url, request, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }});
        console.log(res);
        updateResponse(res.data);
        
    }
    return (
        <div>
            <Form evalFunc={evaluate}></Form>
            <p>{response}</p>
        </div>
    );
};