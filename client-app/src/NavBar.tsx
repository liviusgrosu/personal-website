import { useState } from 'react'
import { Menu } from 'semantic-ui-react'

export default function NavBar() {
    const [state, setState] = useState('');

    return (
        <Menu 
            inverted
            borderless
            compact
        >
            <Menu.Item
                name='about'
                active={state === 'home'}
                onClick={() => setState('home')}
            />
            <Menu.Item
                name='portfolio'
                active={state === 'messages'}
                onClick={() => setState('messages')}
            />
            <Menu.Item
                name='blog'
                active={state === 'friends'}
                onClick={() => setState('friends')}
            />
            <Menu.Item
                name='contact'
                active={state === 'contact'}
                onClick={() => setState('contact')}
            />
        </Menu>
    )
}