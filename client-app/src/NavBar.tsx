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
                name='home'
                active={state === 'home'}
                onClick={() => setState('home')}
            />
            <Menu.Item
                name='messages'
                active={state === 'messages'}
                onClick={() => setState('messages')}
            />
            <Menu.Item
                name='friends'
                active={state === 'friends'}
                onClick={() => setState('friends')}
            />
        </Menu>
    )
}