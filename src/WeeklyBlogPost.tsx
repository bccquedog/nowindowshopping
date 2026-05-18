import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getWeeklyPostBySlug } from './weeklyBlogPosts';

const isPostPublished = (publishDateTime: string) => new Date(publishDateTime).getTime() <= Date.now();

const WeeklyBlogPost: React.FC = () => {
  const { slug } = useParams();
  const post = getWeeklyPostBySlug(slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-950">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">NWS Blog</p>
          <h1 className="mb-4 text-3xl font-bold">Post not found</h1>
          <p className="mb-6 text-slate-600">That weekly post is not in the schedule.</p>
          <Link to="/blog" className="font-semibold text-blue-700 hover:text-blue-900">
            Back to the blog
          </Link>
        </div>
      </main>
    );
  }

  const isPublished = isPostPublished(post.publishDateTime);

  if (!isPublished) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-950">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">
            Week {post.week} - scheduled for {post.displayDate} at {post.displayTime}
          </p>
          <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>
          <p className="mb-6 text-lg leading-relaxed text-slate-700">{post.description}</p>
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-5 text-slate-700">
            This post is queued for its Monday release. New No Window Shopping weekly posts unlock every Monday.
          </div>
          <Link to="/blog" className="mt-8 inline-block font-semibold text-blue-700 hover:text-blue-900">
            Back to the blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-950">
      <article className="mx-auto max-w-3xl">
        <Link to="/blog" className="mb-8 inline-block font-semibold text-blue-700 hover:text-blue-900">
          Back to the blog
        </Link>

        <header className="mb-8 rounded-2xl bg-slate-950 p-6 text-white shadow-xl sm:p-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-200">
            {post.theme} - Week {post.week} - {post.displayDate} at {post.displayTime}
          </p>
          <h1 className="mb-5 text-3xl font-bold leading-tight sm:text-5xl">{post.title}</h1>
          <p className="text-lg leading-relaxed text-slate-200">{post.description}</p>
        </header>

        <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
          <blockquote className="mb-8 border-l-4 border-blue-600 pl-5 text-xl font-semibold leading-relaxed text-slate-800">
            {post.quote}
          </blockquote>

          <section className="mb-8">
            <h2 className="mb-3 text-2xl font-bold">Why This Matters</h2>
            <p className="leading-relaxed text-slate-700">
              No Window Shopping is about refusing to admire a better life from the outside. This week is a call to move
              from watching, wishing, and waiting into evidence. The goal is not to be loud about growth. The goal is to
              build a life that proves you meant what you said.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-3 text-2xl font-bold">The NWS Move</h2>
            <p className="leading-relaxed text-slate-700">{post.action}</p>
          </section>

          <section className="mb-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="mb-2 text-lg font-bold">Reflection</h3>
              <p className="leading-relaxed text-slate-700">{post.reflection}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="mb-2 text-lg font-bold">This Week's Practice</h3>
              <p className="leading-relaxed text-slate-700">{post.practice}</p>
            </div>
          </section>

          <section className="rounded-xl bg-blue-700 p-5 text-white">
            <h2 className="mb-2 text-xl font-bold">Claim It This Week</h2>
            <p className="leading-relaxed text-blue-50">
              Pick one visible action, give it a deadline, and make it real before next Monday. The point is not to
              admire the idea. The point is to claim the next move.
            </p>
          </section>

          <section className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="mb-4 text-xl font-bold">Companion Social Posts</h2>
            <div className="grid gap-4">
              <div>
                <h3 className="mb-2 font-bold text-slate-900">Instagram</h3>
                <p className="whitespace-pre-line rounded-lg bg-white p-4 text-sm leading-relaxed text-slate-700">
                  {post.instagramCaption}
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-bold text-slate-900">TikTok</h3>
                <p className="rounded-lg bg-white p-4 text-sm leading-relaxed text-slate-700">{post.tiktokCaption}</p>
              </div>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
};

export default WeeklyBlogPost;
