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

        const request = {"url": url, "response": response, "answer": answer, "params": params};
        
        const res = await axios.post("http://localhost:3070", request);
        console.log(res);
        updateResponse(JSON.stringify(res.data));
        // {homes.map(home => <div>{home.name}</div>)}
    }
    return (
        <div>
            <Form evalFunc={evaluate}></Form>
            <p>{response}</p>
        </div>
    );
};