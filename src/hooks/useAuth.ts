import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const { user, session, isLoading, isInitialized, error, login, register, logout, forgotPassword, clearError } =
    useAuthStore();

  return {
    user,
    session,
    isLoading,
    isInitialized,
    error,
    isAuthenticated: \!\!session,
    login,
    register,
    logout,
    forgotPassword,
    clearError,
  };
};
