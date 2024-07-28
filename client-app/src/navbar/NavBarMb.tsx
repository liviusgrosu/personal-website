import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Dimmer, Header, Icon, Menu, MenuItem, Sidebar } from 'semantic-ui-react'

function NavbarMb() {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const toggleSidebar = () => {
        visible ? setVisible(false) : setVisible(true)
    }

    const navigateMenus = (menu: string) => {
        navigate(menu);
        toggleSidebar();
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
                        <Icon className="big bars icon inverted" />
                    </MenuItem>
                </Menu.Menu>
            </Menu>
            <Dimmer active={visible} onClickOutside={toggleSidebar}>
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
                        onClick={() => navigateMenus('/about')}
                    >
                        <Header>About</Header>
                    </MenuItem> 
                    <MenuItem
                        onClick={() => navigateMenus('/projects')}
                    >
                        <Header>Portfolio</Header>
                    </MenuItem>
                    <MenuItem
                        onClick={() => navigateMenus('/blog')}
                    >
                        <Header>Blog Posts</Header>
                    </MenuItem>
                    <MenuItem
                        onClick={() => navigateMenus('/contact')}
                        >
                        <Header>Contact</Header>
                    </MenuItem>
                </Sidebar>
            </Dimmer>
        </>
    )
}

export default NavbarMb