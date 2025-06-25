'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { Post } from '@/types';
import { getPosts } from '@/app/actions';
import { PostCard } from '@/components/features/post-card';
import { AddPostDialog } from '@/components/features/add-post-dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ScrollPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [lastVisible, setLastVisible] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchInitialPosts = useCallback(async () => {
    setLoading(true);
    const result = await getPosts(null);
    if (result.success && result.posts) {
      setPosts(result.posts);
      setLastVisible(result.lastVisible);
      if (!result.lastVisible || result.posts.length < 5) {
        setHasMore(false);
      }
    }
    setLoading(false);
  }, []);

  const fetchMorePosts = async () => {
    if (!lastVisible) {
        setHasMore(false);
        return;
    }
    setLoadingMore(true);
    const result = await getPosts(lastVisible);
    if (result.success && result.posts) {
        setPosts(prev => [...prev, ...result.posts!]);
        setLastVisible(result.lastVisible);
        if (!result.lastVisible || result.posts.length < 5) {
            setHasMore(false);
        }
    }
    setLoadingMore(false);
  }
  
  useEffect(() => {
    fetchInitialPosts();
  }, [fetchInitialPosts]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-background">
      <main className="flex-grow container mx-auto p-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 font-headline">Adventure Scroll</h1>
        
        <div className="space-y-8">
          {loading && (
            <>
              <Skeleton className="w-full max-w-2xl h-[500px] mx-auto rounded-lg" />
              <Skeleton className="w-full max-w-2xl h-[500px] mx-auto rounded-lg" />
            </>
          )}

          {!loading && posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
          
          {!loading && posts.length === 0 && (
            <div className="text-center py-10">
                <p className="text-muted-foreground">No adventures posted yet.</p>
                <p className="text-muted-foreground">Be the first to share!</p>
            </div>
          )}
        </div>

        {hasMore && !loading && (
          <div className="text-center mt-8">
            <Button onClick={fetchMorePosts} disabled={loadingMore}>
              {loadingMore && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Load More
            </Button>
          </div>
        )}
        
        <AddPostDialog />
      </main>
    </div>
  );
}
