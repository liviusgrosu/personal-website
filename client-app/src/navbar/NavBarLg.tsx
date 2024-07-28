import { NavLink } from 'react-router-dom'
import { Header, Menu } from 'semantic-ui-react'

export default function NavBarLg() {
    return (
        <>
            <Header inverted as="h1">
                Livius Grosu
            </Header>
            <Menu 
            inverted
            borderless
            compact
            >
                <Menu.Menu position='right'>
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
                </Menu.Menu>
            </Menu>
        </>
    )
}