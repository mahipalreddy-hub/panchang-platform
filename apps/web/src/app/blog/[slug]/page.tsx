import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { defaultApiClient } from '@panchang/api-client';
import { ArrowLeft, Clock, User, Calendar, Share2, Sparkles } from 'lucide-react';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const posts = await defaultApiClient.getBlogPosts();
  const post = posts.find(p => p.slug === params.slug);
  if (!post) return { title: 'Guide Not Found' };

  return {
    title: `${post.title} | Vedic Astrology Guide`,
    description: post.excerpt,
    keywords: post.seo.keywords,
    alternates: {
      canonical: `https://vedicpanchang.internal/blog/${post.slug}`
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const posts = await defaultApiClient.getBlogPosts();
  const post = posts.find(p => p.slug === params.slug);

  if (!post) notFound();

  return (
    <article className="max-w-4xl mx-auto space-y-8">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300">
        <ArrowLeft className="w-4 h-4" /> Back to Astrology Guides
      </Link>

      <div className="vedic-card p-6 sm:p-10 space-y-6">
        <div className="space-y-3">
          <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
            {post.category.replace('-', ' ')}
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-amber-300/70 pt-2 border-t border-amber-500/15">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" /> {post.author.name}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" /> {post.publishedAt}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> {post.readTimeMinutes} min read
            </span>
          </div>
        </div>

        <div className="pt-6 border-t border-amber-500/20 text-sm sm:text-base leading-relaxed text-amber-100/90 space-y-4">
          <p className="text-lg font-serif italic text-amber-200/90 leading-relaxed border-l-2 border-amber-500 pl-4">
            {post.excerpt}
          </p>
          <div className="prose prose-invert prose-amber max-w-none text-amber-100/80 leading-loose">
            <p>{post.content}</p>
          </div>
        </div>

        {/* Author Bio Box */}
        <div className="mt-8 p-4 rounded-xl bg-amber-950/40 border border-amber-500/20 flex items-center gap-4 text-xs">
          <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center text-white font-serif font-bold text-lg">
            {post.author.name[0]}
          </div>
          <div>
            <span className="font-semibold text-amber-200">{post.author.name}</span>
            <p className="text-amber-300/60 mt-0.5">{post.author.bio}</p>
          </div>
        </div>
      </div>
    </article>
  );
}