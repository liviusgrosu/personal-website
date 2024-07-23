/* eslint-disable react-refresh/only-export-components */
import { Item, ItemContent, ItemDescription, ItemHeader, ItemImage, ItemMeta} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { BlogPost } from "../app/models/blogPost";

interface Props {
    blogPost: BlogPost
}

export default observer(function BlogPostcard({blogPost}: Props) {
    return (
        <Item as={Link} to={`/blog/${blogPost.id}`}>
            <ItemImage src={blogPost.image || '/placeholder.png'} />
            <ItemContent>
                <ItemHeader content={blogPost.title}/>
                <ItemMeta 
                    content={format(blogPost.date, 'dd MMM yyyy h:mm aa')}
                />
                <ItemDescription content={blogPost.description}/>
            </ItemContent>
        </Item>
    );
})