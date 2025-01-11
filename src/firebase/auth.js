import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {auth} from './config';

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    console.log("Sign in successful:", result);  // 결과 확인용 로그

    return {
      isAuthenticated: true,
      user: {
        id: result.user.uid,
        email: result.user.email,
        name: result.user.displayName,
        picture: result.user.photoURL
      },
      accessToken: await result.user.getIdToken()
    };
  } catch (error) {
    console.error("Google sign in error:", error);
    throw error;
  }
};

export const signOut = () => auth.signOut();