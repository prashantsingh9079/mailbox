import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function HomeComponent() {
    return (
        <div >
            <Nav style={{ background: 'skyblue', color: 'white', padding: '1rem', borderColor: 'blue' }}><i><b>Welcome to Mailbox!!!</b></i></Nav>
            <div>
                <ul>
                    <li><b><Link to='/compose'>Compose & Send Email</Link></b></li>
                </ul>
            </div>

        </div>
    )
}
