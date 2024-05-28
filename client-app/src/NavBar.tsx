import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

export default function NavBar() {

    return (
        <Menu 
            inverted
            borderless
            compact
        >
            <Menu.Item
                name='about'
                as={NavLink}
                to='/about'
            />
            <Menu.Item
                name='portfolio'
                as={NavLink}
                to='/projects'
            />
        </Menu>
    )
}