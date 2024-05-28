/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { useStore } from "../app/stores/store"
import { observer } from "mobx-react-lite";
import DOMPurify from "dompurify";
export default observer (function AboutPage() {
    const {aboutStore: {loadAbout, aboutText}} = useStore();
    
    useEffect(() => {
        loadAbout();
    }, [loadAbout])

    const sanitizedHtml = DOMPurify.sanitize(aboutText);

    return (
        <p>
            <div dangerouslySetInnerHTML={{__html: sanitizedHtml }}/>
        </p>
    )
})