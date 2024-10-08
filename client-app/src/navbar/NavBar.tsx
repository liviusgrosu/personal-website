import { useMediaQuery } from 'react-responsive'
import NavbarMb from './NavBarMb';
import NavBarLg from './NavBarLg';

export default function NavBar() {
    const none = useMediaQuery({ query: "(max-width:576px)" }) 
    const sm = useMediaQuery({ query: "(min-width:576px)" })
    const md = useMediaQuery({ query: "(min-width:768px)" })
    const lg = useMediaQuery({ query: "(min-width:992px)" })
    const xl = useMediaQuery({ query: "(min-width:1200px)" })
    const xxl = useMediaQuery({ query: "(min-width:1400px)" })
    const size = {none,sm,md,lg,xl,xxl}
    return (
        <div>
             {size.sm ? <NavBarLg/> : <NavbarMb/>}
        </div>
    )    
}