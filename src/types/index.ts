export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  imageHint: string;
}

export interface Package {
  id: string;
  name: string;
  destination: string;
  duration: string;
  price: string;
  highlights: string[];
  image: string;
  imageHint: string;
}

export interface TravelBuddyProfile {
  id: string;
  name: string;
  age: number;
  interests: string[];
  destination: string;
  travelDate: string;
  avatar: string;
  avatarHint: string;
}

export interface Post {
  id:string;
  userId: string;
  username: string;
  userAvatar: string;
  title: string;
  location: string;
  imageUrl: string;
  imageHint?: string;
  story: string;
  timestamp: string; // Serialized ISO 8601 string
  likes: number;
  likedBy: string[];
}
