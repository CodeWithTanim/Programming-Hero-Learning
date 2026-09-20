import Link from "next/link";

const Post = ({ post }) => {
    const { id, title } = post;
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p></p>
                <div className="card-actions justify-end">
                    <Link href={`/blogs/${id}`}>
                        <button className="btn btn-primary">Show Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Post;