import { Link } from "react-router-dom";

export default function ListItem({ post }) {
  return (
    <Link key={post._id} to={`/posts/detail/${post._id}`}>
      <article className="flex items-start space-x-6 p-6 hover:bg-slate-50">
        <img
          src={post.coverPicture}
          alt={post.title}
          className="flex-none rounded-md bg-slate-100 object-cover w-[300px] h-[180px]"
        />
        <div className="min-w-0 relative flex-auto">
          <h2 className="text-2xl font-bold text-slate-900 truncate pr-20">
            {post.title}
          </h2>
          <dl className="mt-2 flex flex-wrap text-sm leading-6 font-medium space-x-1">
            {post.categories.map((category) => (
              <div className="text-green-600" key={category._id}>
                <dt className="sr-only">Runtime</dt>
                <dd className="flex items-center">{category.name}</dd>
              </div>
            ))}
            <div className="flex-none w-full mt-2 font-normal">
              <dt className="sr-only">Cast</dt>
              <dd className="text-slate-700">
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${post.description.substring(0, 400)}...`,
                  }}
                />
              </dd>
            </div>
          </dl>
        </div>
      </article>
    </Link>
  );
}
