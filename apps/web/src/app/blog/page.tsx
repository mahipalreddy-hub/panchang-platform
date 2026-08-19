import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { defaultApiClient } from '@panchang/api-client';
import { BookOpen, Sparkles, Clock, User, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Vedic Astrology & Muhurat Guides | Learn Panchang Science',
  description: 'Deep dives into Rahu Kalam calculation, Vivah Muhurat selection rules, Choghadiya importance, and Vedic astrology principles.',
  keywords: ['vedic astrology guides', 'how to calculate panchang', 'rahu kalam explained', 'muhurat selection rules']
};

export default async function BlogPage() {
  const posts = await defaultApiClient.getBlogPosts();

  return (
    <div className="space-y-8">
      <div className="vedic-card-glow p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
          <BookOpen className="w-4 h-4" /> Vedic Wisdom Center
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100">
          Astrology & Muhurat Explainer Guides
        </h1>
        <p className="text-sm text-amber-200/80 max-w-3xl leading-relaxed">
          Comprehensive articles deciphering the astronomical equations, Nakshatra rules, and spiritual reasons behind auspicious timing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <article key={post.id} className="p-6 rounded-2xl bg-vedic-card border border-amber-500/25 flex flex-col justify-between space-y-4 hover:border-amber-400/50 transition-all">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                {post.category.replace('-', ' ')}
              </span>
              <h2 className="text-xl font-serif font-bold text-amber-100 hover:text-amber-400 transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-xs text-amber-200/70 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-amber-500/15 flex items-center justify-between text-xs text-amber-300/70">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> {post.author.name}
              </span>
              <Link href={`/blog/${post.slug}`} className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1">
                Read Guide <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}