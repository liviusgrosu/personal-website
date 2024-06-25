/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { useStore } from "../app/stores/store"
import { observer } from "mobx-react-lite";
export default observer (function AboutPage() {
    const {aboutStore: {loadAbout, aboutText}} = useStore();
    
    useEffect(() => {
        loadAbout();
    }, [loadAbout])

    return (
        <div dangerouslySetInnerHTML={{__html: aboutText }}/>
    )
})