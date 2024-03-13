import { useSelector } from 'react-redux';
import {
    selectAllPosts,
    selectPostsStatus,
    selectPostsError,
} from './postsSlice';
import PostsExerpt from './PostsExerpt';
import "../../styles/bloglist.css";

const PostsList = () => {
    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(selectPostsStatus);
    const error = useSelector(selectPostsError);

    let content;
    if (postsStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (postsStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
        content = orderedPosts.map((post) => (
            <PostsExerpt key={post.id} post={post} />
        ));
    } else if (postsStatus === 'failed') {
        content = <p>{error}</p>;
    }

    return (
        <section className="posts-list">
            <div className="container-fluid">
                <div className="row g-3">
                    {content}
                </div>
            </div>
        </section>
    );
};

export default PostsList;
