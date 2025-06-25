'use client';

import React, { useOptimistic, startTransition } from 'react';
import type { Post } from '@/types';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MapPin } from 'lucide-react';
import { toggleLike } from '@/app/actions';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { user } = useAuth();
  const isMockPost = post.id.startsWith('mock-');
  
  const [optimisticPost, setOptimisticPost] = useOptimistic(
    post,
    (state, _) => {
      if (!user || isMockPost) return state;
      const alreadyLiked = state.likedBy.includes(user.uid);
      return {
        ...state,
        likes: alreadyLiked ? state.likes - 1 : state.likes + 1,
        likedBy: alreadyLiked
          ? state.likedBy.filter(id => id !== user.uid)
          : [...state.likedBy, user.uid],
      };
    }
  );

  const handleLikeClick = async () => {
    if (!user || isMockPost) return;
    startTransition(() => {
        setOptimisticPost(null);
    });
    await toggleLike(post.id, user.uid);
  };
  
  const isLiked = user ? optimisticPost.likedBy.includes(user.uid) : false;

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden shadow-lg border">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={optimisticPost.userAvatar} alt={optimisticPost.username} />
            <AvatarFallback>{optimisticPost.username?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{optimisticPost.username}</p>
            <p className="text-xs text-muted-foreground">
              {optimisticPost.timestamp ? formatDistanceToNow(optimisticPost.timestamp.toDate(), { addSuffix: true }) : 'Just now'}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative w-full aspect-[4/3]">
          <Image src={optimisticPost.imageUrl} alt={optimisticPost.title} fill style={{ objectFit: 'cover' }} data-ai-hint={optimisticPost.imageHint || "travel adventure"} />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 font-headline">{optimisticPost.title}</h3>
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 mr-1.5" />
            {optimisticPost.location}
          </div>
          <p className="text-foreground/90 whitespace-pre-wrap">{optimisticPost.story}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-6 pt-0">
        <div className="flex items-center space-x-2">
            <Button
                variant="ghost"
                size="icon"
                onClick={handleLikeClick}
                disabled={!user || isMockPost}
                className="group"
            >
                <Heart className={`h-5 w-5 transition-all ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-500 group-hover:text-red-400'}`} />
            </Button>
            <span className="text-sm text-muted-foreground">{optimisticPost.likes} {optimisticPost.likes === 1 ? 'like' : 'likes'}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
