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
                name='About'
                as={NavLink}
                to='/about'
            />
            <Menu.Item
                name='Portfolio'
                as={NavLink}
                to='/projects'
            />
            <Menu.Item
                name='Blog Posts'
                as={NavLink}
                to='/blog'
            />
            <Menu.Item
                name='Contact'
                as={NavLink}
                to='/contact'
            />
        </Menu>
    )
}