'use client';

import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogIn, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function AuthButton() {
  const { user, loading, isFirebaseConfigured } = useAuth();
  const { toast } = useToast();

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google', error);
      let description = 'An unexpected error occurred during sign-in.';
       if (error instanceof Error && 'code' in error) {
        const firebaseError = error as { code: string; message: string };
        switch (firebaseError.code) {
          case 'auth/popup-closed-by-user':
            description = 'The sign-in popup was closed. Please try again.';
            break;
          case 'auth/cancelled-popup-request':
            description = 'The sign-in was cancelled.';
            break;
          case 'auth/operation-not-allowed':
             description = 'Sign-in with Google is not enabled. Please enable it in your Firebase project settings under Authentication > Sign-in method.';
             break;
          default:
            description = `Error: ${firebaseError.message} (${firebaseError.code})`;
        }
      }
      toast({
        variant: 'destructive',
        title: 'Sign-in Failed',
        description,
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out', error);
      let description = 'An unexpected error occurred during sign-out.';
       if (error instanceof Error) {
         description = error.message;
       }
      toast({
        variant: 'destructive',
        title: 'Sign-out Failed',
        description,
      });
    }
  };

  if (!isFirebaseConfigured) {
    return (
        <Button variant="outline" size="sm" disabled title="Firebase is not configured">
            <LogIn className="mr-2 h-4 w-4" />
            Login
        </Button>
    );
  }

  if (loading) {
    return <Button variant="outline" size="sm" disabled>Loading...</Button>;
  }

  if (!user) {
    return (
      <Button variant="outline" size="sm" onClick={handleSignIn}>
        <LogIn className="mr-2 h-4 w-4" />
        Login
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
            <AvatarFallback>{user.displayName?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
