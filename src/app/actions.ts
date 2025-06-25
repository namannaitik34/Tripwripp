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
import { db, storage, isConfigured } from '@/lib/firebase';
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

const MOCK_AVATAR = 'https://placehold.co/100x100.png';

const MOCK_POSTS: Post[] = [
  {
    id: 'mock-1',
    userId: 'user-trekker',
    username: 'TrekkingTom',
    userAvatar: MOCK_AVATAR,
    title: 'Conquering the Annapurna Circuit',
    location: 'Annapurna, Nepal',
    imageUrl: 'https://placehold.co/800x600.png',
    imageHint: 'annapurna mountains nepal',
    story: '15 days of pure bliss and pain. The views were otherworldly, and the people I met along the way were incredible. Every step was a challenge, but reaching the Thorung La Pass was a moment of pure triumph. #trekking #nepal #adventure',
    timestamp: { toDate: () => new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
    likes: 256,
    likedBy: [],
  },
  {
    id: 'mock-2',
    userId: 'user-beachlover',
    username: 'SandySarah',
    userAvatar: MOCK_AVATAR,
    title: 'Lost in the Paradise of Phi Phi Islands',
    location: 'Phi Phi Islands, Thailand',
    imageUrl: 'https://placehold.co/800x600.png',
    imageHint: 'thailand beach longtail boat',
    story: 'Spent a week island hopping, swimming in turquoise waters, and just soaking up the sun. The highlight was a private boat tour to Maya Bay at sunrise, before the crowds arrived. Unforgettable. #beachlife #thailand #travel',
    timestamp: { toDate: () => new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
    likes: 489,
    likedBy: [],
  },
  {
    id: 'mock-3',
    userId: 'user-foodie',
    username: 'GourmetGary',
    userAvatar: MOCK_AVATAR,
    title: 'A Culinary Journey Through Tokyo',
    location: 'Tokyo, Japan',
    imageUrl: 'https://placehold.co/800x600.png',
    imageHint: 'tokyo street food',
    story: 'From Michelin-starred sushi to street-side ramen, Tokyo is a food lover\'s dream. I think I gained 5 pounds in a week, and it was worth every single calorie. The Tsukiji Fish Market was an assault on the senses in the best way possible. #foodie #japan #story',
    timestamp: { toDate: () => new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) },
    likes: 312,
    likedBy: [],
  },
  {
    id: 'mock-4',
    userId: 'user-adventurer',
    username: 'AdventurousAnna',
    userAvatar: MOCK_AVATAR,
    title: 'Safari Adventure in the Serengeti',
    location: 'Serengeti, Tanzania',
    imageUrl: 'https://placehold.co/800x600.png',
    imageHint: 'safari giraffe tanzania',
    story: 'Waking up to the sounds of the savanna is something I\'ll never forget. We saw the Big Five in two days! The sheer scale of the landscape and the abundance of wildlife is just humbling. #safari #adventure #africa',
    timestamp: { toDate: () => new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) },
    likes: 673,
    likedBy: [],
  },
  {
    id: 'mock-5',
    userId: 'user-hiker',
    username: 'HikerHarry',
    userAvatar: MOCK_AVATAR,
    title: 'Hiking the Inca Trail to Machu Picchu',
    location: 'Cusco, Peru',
    imageUrl: 'https://placehold.co/800x600.png',
    imageHint: 'machu picchu peru',
    story: 'A 4-day trek through ancient paths, cloud forests, and stunning mountain scenery. Arriving at the Sun Gate to see Machu Picchu spread out below at sunrise... words can\'t do it justice. A spiritual experience. #trekking #peru #history',
    timestamp: { toDate: () => new Date(Date.now() - 20 * 24 * 60 * 60 * 1000) },
    likes: 831,
    likedBy: [],
  },
  {
    id: 'mock-6',
    userId: 'user-explorer',
    username: 'ExplorerEve',
    userAvatar: MOCK_AVATAR,
    title: 'Exploring the Glaciers of Iceland',
    location: 'Vatnajökull, Iceland',
    imageUrl: 'https://placehold.co/800x600.png',
    imageHint: 'iceland ice cave',
    story: 'Walking inside a crystal blue ice cave was like stepping into another dimension. Iceland\'s landscapes are so dramatic and raw, from the black sand beaches to the powerful waterfalls. A true land of fire and ice. #adventure #iceland #glacier',
    timestamp: { toDate: () => new Date(Date.now() - 25 * 24 * 60 * 60 * 1000) },
    likes: 550,
    likedBy: [],
  },
  {
    id: 'mock-7',
    userId: 'user-cityslicker',
    username: 'UrbanUmar',
    userAvatar: MOCK_AVATAR,
    title: 'Rooftop Views and City Lights in NYC',
    location: 'New York City, USA',
    imageUrl: 'https://placehold.co/800x600.png',
    imageHint: 'new york skyline',
    story: 'There\'s an energy in New York that\'s addictive. From Broadway shows to quiet moments in Central Park, the city has it all. The best part? Discovering a hidden rooftop bar with a perfect view of the skyline. #citybreak #nyc #story',
    timestamp: { toDate: () => new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    likes: 410,
    likedBy: [],
  },
];

export async function getMockPosts(lastVisible: string | null = null) {
  const pageSize = 5;
  let startIndex = 0;
  if (lastVisible) {
      const lastIndex = MOCK_POSTS.findIndex(p => p.id === lastVisible);
      if (lastIndex !== -1) {
          startIndex = lastIndex + 1;
      }
  }
  
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  
  const paginatedPosts = MOCK_POSTS.slice(startIndex, startIndex + pageSize);
  const newLastVisible = (startIndex + pageSize) < MOCK_POSTS.length ? paginatedPosts[paginatedPosts.length - 1]?.id : null;
  
  return { success: true, posts: paginatedPosts, lastVisible: newLastVisible };
}

export async function getPosts(lastVisible: string | null = null) {
  if (!isConfigured) {
    return { success: true, posts: [], lastVisible: null };
  }

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
  if (!isConfigured) {
    return { success: false, error: 'Firebase is not configured. Please add your credentials to the .env file.' };
  }

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
  if (!isConfigured) {
    return { success: false, error: 'Firebase is not configured. Please add your credentials to the .env file.' };
  }
  
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
