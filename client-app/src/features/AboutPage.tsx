/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { useStore } from "../app/stores/store"
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
export default observer (function AboutPage() {
    const {aboutStore: {loadAbout, aboutText}, commonStore: {token}} = useStore();
    
    useEffect(() => {
        loadAbout();
    }, [loadAbout])

    return (
        <>
            {token && (
                <Button 
                icon="plus icon" 
                content="Edit About"
                as={Link}
                to={`/about-edit`}
                style={{ marginBottom: '15px' }}
                fluid
                primary
            /> 
            )}
            <div className="detailsPage" dangerouslySetInnerHTML={{__html: aboutText }}/>
        </>
    )
})