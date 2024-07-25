import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Header, Menu, MenuItem, Sidebar } from 'semantic-ui-react'

function NavbarMb() {
    const [visible, setVisible] = useState(false)
    const toggleSidebar = () => {
        visible ? setVisible(false) : setVisible(true)
    }
    return (
        <>
            <Menu inverted
                borderless
                attached
            >
                <MenuItem>
                    <Header inverted as="h1" content="Livius Grosu"/>
                </MenuItem>
                <Menu.Menu position='right'>
                    <MenuItem onClick={toggleSidebar}>
                    {visible && (
                        <i className="big close red icon" />
                    )}
                    {!visible && (
                        <i className="big bars icon inverted" />
                    )}
                    </MenuItem>
                </Menu.Menu>
            </Menu>
            <Sidebar 
                as={Menu}
                animation='overlay'
                icon='labeled'
                inverted
                vertical
                width='thin'
                visible={visible}
            >
                <MenuItem
                    as={NavLink}
                    to='/about'
                >
                    <Header>About</Header>
                </MenuItem> 
                <MenuItem
                    as={NavLink}
                    to='/projects'
                >
                    <Header>Portfolio</Header>
                </MenuItem>
                <MenuItem
                    as={NavLink}
                    to='/blog'
                >
                    <Header>Blog Posts</Header>
                </MenuItem>
                <MenuItem
                    as={NavLink}
                    to='/contact'
                    >
                    <Header>Contact</Header>
                </MenuItem>
            </Sidebar>
        </>
    )
}

export default NavbarMb