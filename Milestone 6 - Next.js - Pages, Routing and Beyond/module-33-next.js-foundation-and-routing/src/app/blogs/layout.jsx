
const PostLayout = ({children}) => {
    return (
        <div>
            <h2>Fixed Portion of Blog layout</h2>
            <div>{children}</div>
        </div>
    );
};

export default PostLayout;