import React, { useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import classes from './ComposeComponent.module.css'
import axios from 'axios';



export default function ComposeComponent() {
    // const history = useHistory()
    const [editorValue, setEditorValue] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [mailSent, setMailSent] = useState(false)

    const onEditorStateChange = (contentState) => {
        let text = ''
        contentState.blocks.forEach((e) => {
            text += ` ${e.text}`
        })
        setEditorValue(text)
    }

    const EmailHandler = async (event) => {
        event.preventDefault()
        const date = new Date()
        console.log(date)
        
        const mailObj = {
            email: email,
            date: date,
            subject: subject,
            content: editorValue,
        }
        let tmp1 = email.split('@')[0] //prashant.singh
        let tmp2 = email.split('@')[1] //gmail.com
        let tmp3 = tmp2.split('.')[0] // gmail
        let tmp4 = tmp2.split('.')[1]// com
        let finalMail = tmp1 + tmp3 + tmp4
        console.log(finalMail)

        try {
            const resp = await axios.post(
                `https://mailbox-4988f-default-rtdb.firebaseio.com/mails/${finalMail}.json`,
                mailObj
            )
            console.log(resp)
            if (resp.status === 200) {
                setMailSent(true)
                setTimeout(() => {
                    // history.replace('/...')
                    setMailSent(false)
                }, 1500)
            } else {
                let errorMessage = 'Sending mail failed'
                const data = await resp.json()
                console.log(data)
                errorMessage = data.error.message
                throw new Error(errorMessage)
            }
        } catch (error) {
            window.alert(error.message)
            console.log(error.message)
        }

        console.log(mailObj)
    }
    return (
        <>
            <div className={classes.editorComp}>
                <form onSubmit={EmailHandler} className={classes.mailForm}>
                    <div className={classes.eHeader}>
                        <p>New Message</p>
                        <div className={classes.eHeBtn}>
                            <p>-</p>
                            <p>x</p>
                        </div>
                    </div>
                    <input
                        type='email'
                        placeholder='To'
                        id='email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='Subject'
                        id='subject'
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    <div className={classes.mailBox}>
                        <Editor
                            toolbarClassName='toolbarClassName'
                            wrapperClassName='wrapperClassName'
                            editorClassName='editorClassName'
                            onContentStateChange={onEditorStateChange}
                            value={editorValue}
                        />
                    </div>
                    {!mailSent && <button type='submit'>Send</button>}
                    {mailSent && (
                        <p className={classes.sentP}>Mail sent successfully...!</p>
                    )}
                </form>
            </div>


        </>
    )
}
