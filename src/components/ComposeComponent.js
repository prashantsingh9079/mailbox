import React from 'react'
import { useRef } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { Editor } from "react-draft-wysiwyg";
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default function ComposeComponent() {
    const emailRef = useRef()
    function submitHandler(e)
    {
        e.preventDefault();
        console.log(emailRef)
    }
    return (
        <>
            <Nav style={{ background: 'skyblue', color: 'white', padding: '1rem', borderColor: 'blue' }}><i>Send Mail</i></Nav>
            <form style={{border:'1px solid',padding:'1rem'}} >
                <div style={{ background: 'lightyellow', borderColor: 'black', margin: '3rem', border: '2px solid' }} >
                    <Editor
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                        ref={emailRef}
                    />
                </div>
                <Button onClick={submitHandler}>Send</Button>
            </form>

            
        </>
    )
}
