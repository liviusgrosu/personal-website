/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { useStore } from "../app/stores/store"
import { observer } from "mobx-react-lite";
import { Button, List, ListContent, ListDescription, ListHeader, ListIcon, ListItem } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import { format } from "date-fns";
export default observer (function BlogPosts() {
    const {blogPostStore: {loadBlogPosts, blogPosts}} = useStore();
    
    useEffect(() => {
        loadBlogPosts();
    }, [loadBlogPosts])

    return (
        <List divided relaxed>
            <Button 
                icon="plus icon" 
                content="New Blog Post"
                as={Link}
                to={`/blog-create`}
            />
            {blogPosts.map(blogPost => (
                <ListItem>
                    <ListIcon/>
                    <ListContent>
                        <ListHeader 
                            as={NavLink} 
                            to={`/blog/${blogPost.id}`}>
                                {blogPost.title}
                        </ListHeader>
                        <ListDescription>{format(blogPost.date, 'dd MMM yyyy h:mm aa')}</ListDescription>
                        <Button 
                            basic color="blue"
                            as={Link}
                            to={`/blog-edit/${blogPost.id}`}
                        >
                            Edit
                        </Button>
                    </ListContent>
                </ListItem>
            ))}
        </List>
    )
})