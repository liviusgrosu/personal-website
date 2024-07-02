/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { useStore } from "../app/stores/store"
import { observer } from "mobx-react-lite";
import { Button, Item, ItemContent, ItemDescription, ItemGroup, ItemHeader, ItemImage, ItemMeta } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import { format } from "date-fns";
export default observer (function BlogPosts() {
    const {blogPostStore: {loadBlogPosts, blogPosts}, commonStore: {token}} = useStore();
    
    useEffect(() => {
        loadBlogPosts();
    }, [loadBlogPosts])

    return (
        <>            
            {token && (
                <Button 
                    icon="plus icon" 
                    content="New Blog Post"
                    as={Link}
                    to={`/blog-create`}
                />
            )}
            {blogPosts.map(blogPost => (
                <ItemGroup>
                    <Item>
                        <ItemImage size='small' src='/placeholder.png' />
                        <ItemContent>
                            <ItemHeader 
                                as={NavLink} 
                                to={`/blog/${blogPost.id}`}
                                content={blogPost.title}
                            />
                            <ItemMeta 
                                content={format(blogPost.date, 'dd MMM yyyy h:mm aa')}
                            />
                            <ItemDescription
                                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec sagittis aliquam malesuada bibendum arcu. Nec sagittis aliquam malesuada bibendum. Magna ac placerat vestibulum lectus mauris ultrices eros in"   
                            />
                        </ItemContent>
                    </Item>
                </ItemGroup>
            ))}
        </>
    )
})