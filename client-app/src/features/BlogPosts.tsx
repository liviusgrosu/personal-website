/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { useStore } from "../app/stores/store"
import { observer } from "mobx-react-lite";
import { List, ListContent, ListDescription, ListHeader, ListIcon, ListItem } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
export default observer (function BlogPosts() {
    const {blogPostStore: {loadBlogPosts, blogPosts}} = useStore();
    
    useEffect(() => {
        loadBlogPosts();
    }, [loadBlogPosts])

    return (
        <List divided relaxed>
            {blogPosts.map(blogPost => (
                <ListItem>
                    <ListIcon/>
                    <ListContent>
                        <ListHeader 
                            as={NavLink} 
                            to={`/blog/${blogPost.id}`}>
                                {blogPost.title}
                            </ListHeader>
                        <ListDescription>{blogPost.date.toString()}</ListDescription>
                    </ListContent>
                </ListItem>
            ))}
        </List>
    )
})