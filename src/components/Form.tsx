import React, {useState, MouseEventHandler} from 'react'

type FormProps = {
    evalFunc: any
}
export function Form(props: FormProps) {
    const [urlValue, setUrlValue] = useState('');
    const [schemaValue, setSchemaValue] = useState('{}');
    interface ChangeEvent {
        target: {
            value: string;
        }
    }
    const handleUrlChange = (event: ChangeEvent) => {
        setUrlValue(event.target.value);
    }
    const handleSchemaChange = (event: ChangeEvent) => {
        setSchemaValue(event.target.value);
    }
    return (
        <form>
            <label>URL: </label>
            <input type="text" value = {urlValue} onChange={handleUrlChange} /><br />
            <label>Schema: </label>
            <input type="text" value = {schemaValue} onChange={handleSchemaChange} /><br />
            <button type="button" onClick={(e) => {
                props.evalFunc(urlValue, JSON.parse(schemaValue))
            }}>Evaluate</button>
        </form>
    );
}