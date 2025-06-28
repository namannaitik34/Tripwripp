'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { signInWithGoogle, signOutWithGoogle } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { LogIn, LogOut, Loader2 } from 'lucide-react';

export function AuthButton() {
  const { user, loading, isFirebaseConfigured } = useAuth();
  const { toast } = useToast();

  const handleSignIn = async () => {
    if (!isFirebaseConfigured) {
      toast({ variant: 'destructive', title: 'Firebase Not Configured', description: 'Please add your Firebase credentials to the .env file.' });
      return;
    }
    const { success, error, code } = await signInWithGoogle();
    if (!success) {
      toast({
        variant: 'destructive',
        title: 'Sign-in Failed',
        description: `Error: ${error} (Code: ${code})`,
      });
    } else {
        toast({ title: 'Signed in successfully!' });
    }
  };

  const handleSignOut = async () => {
    const { success, error } = await signOutWithGoogle();
    if (!success) {
      toast({ variant: 'destructive', title: 'Sign-out Failed', description: error });
    } else {
        toast({ title: 'Signed out successfully!' });
    }
  };

  if (loading) {
    return (
        <Button variant="outline" size="sm" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
        </Button>
    );
  }

  return (
    <>
      {user ? (
        <Button variant="outline" size="sm" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      ) : (
        <Button size="sm" onClick={handleSignIn} disabled={!isFirebaseConfigured}>
            <LogIn className="mr-2 h-4 w-4" />
            Sign In with Google
        </Button>
      )}
    </>
  );
}
