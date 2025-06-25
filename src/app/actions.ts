"use server";

import { suggestDestinations, type SuggestDestinationsInput, type SuggestDestinationsOutput } from "@/ai/flows/suggest-destinations";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter,
  doc,
  getDoc,
  updateDoc,
  runTransaction,
} from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import type { Post } from '@/types';
import { revalidatePath } from 'next/cache';


interface SuggestDestinationsResult {
  success: boolean;
  data?: SuggestDestinationsOutput;
  error?: string;
}

export async function handleSuggestDestinations(input: SuggestDestinationsInput): Promise<SuggestDestinationsResult> {
  try {
    const result = await suggestDestinations(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in handleSuggestDestinations:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unknown error occurred." };
  }
}

export async function getPosts(lastVisible: string | null = null) {
  try {
    const postsRef = collection(db, 'posts');
    let q;
    if (lastVisible) {
      const lastVisibleDoc = await getDoc(doc(db, 'posts', lastVisible));
      q = query(postsRef, orderBy('timestamp', 'desc'), startAfter(lastVisibleDoc), limit(5));
    } else {
      q = query(postsRef, orderBy('timestamp', 'desc'), limit(5));
    }

    const querySnapshot = await getDocs(q);
    const posts: Post[] = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() } as Post);
    });

    const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]?.id || null;

    return { success: true, posts, lastVisible: newLastVisible };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { success: false, error: 'Failed to fetch posts.' };
  }
}

interface AddPostInput {
  userId: string;
  username: string;
  userAvatar: string;
  title: string;
  location: string;
  story: string;
  imageDataUrl: string;
}

export async function addPost(data: AddPostInput) {
  try {
    const imageRef = ref(storage, `posts/${data.userId}/${Date.now()}`);
    await uploadString(imageRef, data.imageDataUrl, 'data_url');
    const imageUrl = await getDownloadURL(imageRef);

    await addDoc(collection(db, 'posts'), {
      userId: data.userId,
      username: data.username,
      userAvatar: data.userAvatar,
      title: data.title,
      location: data.location,
      story: data.story,
      imageUrl,
      timestamp: serverTimestamp(),
      likes: 0,
      likedBy: [],
    });
    
    revalidatePath('/scroll');
    return { success: true };
  } catch (error) {
    console.error('Error adding post:', error);
    return { success: false, error: 'Failed to add post.' };
  }
}

export async function toggleLike(postId: string, userId: string) {
  try {
    const postRef = doc(db, 'posts', postId);
    await runTransaction(db, async (transaction) => {
      const postDoc = await transaction.get(postRef);
      if (!postDoc.exists()) {
        throw 'Document does not exist!';
      }

      const postData = postDoc.data();
      const likedBy = postData.likedBy || [];
      const likes = postData.likes || 0;
      
      if (likedBy.includes(userId)) {
        transaction.update(postRef, {
          likes: likes - 1,
          likedBy: likedBy.filter((id: string) => id !== userId),
        });
      } else {
        transaction.update(postRef, {
          likes: likes + 1,
          likedBy: [...likedBy, userId],
        });
      }
    });

    revalidatePath('/scroll');
    return { success: true };
  } catch (error) {
    console.error('Error toggling like:', error);
    return { success: false, error: 'Failed to update like status.' };
  }
}
