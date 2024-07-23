/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { useStore } from "../app/stores/store"
import { observer } from "mobx-react-lite";
import { Button, Grid, GridColumn, ItemGroup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import BlogPostCard from "./BlogPostCard";
export default observer (function BlogPosts() {
    const {blogPostStore: {loadBlogPosts, blogPosts}, commonStore: {token}} = useStore();
    
    useEffect(() => {
        loadBlogPosts();
    }, [loadBlogPosts])

    return (
        <Grid>
            <GridColumn width={16}>
                {token && (
                    <Button 
                        icon="plus icon" 
                        content="New Blog Post"
                        as={Link}
                        to={`/blog-create`}
                        style={{ marginBottom: '15px' }}
                        fluid
                        primary
                    />
                )}
                <ItemGroup relaxed>
                    {blogPosts.map(blogPost => (
                        <BlogPostCard key={blogPost.id} blogPost={blogPost}/>
                    ))}
                </ItemGroup>
            </GridColumn>
        </Grid>
    )
})