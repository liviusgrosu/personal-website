import { useMediaQuery } from 'react-responsive'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import NavbarMb from './NavBarMb';

export default function NavBar() {

    const renderLinks = () => {
        return (
            <>
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
            </>
        )
    };
    const sm = useMediaQuery({ query: "(min-width:576px)" });
    const size = {sm};
    return (
        <div>
            <NavbarMb renderLinks={renderLinks}/>
        </div>
    )    
}