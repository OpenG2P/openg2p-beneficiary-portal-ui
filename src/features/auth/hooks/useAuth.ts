import { useAuth as useGlobalAuth } from '@/context/global';

export const useAuth = () => {
  const auth = useGlobalAuth();
  
  return {
    profile: auth.profile,
    isAuthenticated: !!auth.profile,
    isLoading: false, // Add loading state management if needed
    setProfile: auth.setProfile,
  };
};
