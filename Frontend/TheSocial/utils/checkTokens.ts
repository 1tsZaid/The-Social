import { verifyAccessToken, verifyRefreshToken, refreshAccessToken } from '@/services/auth';
import { getTokens, saveTokens } from './tokenStorage';

export async function checkTokens(): Promise<boolean> {
  const tokens = await getTokens();
  
  if (!tokens) {
    return false; // No tokens found, user is not authenticated
  }

  try {
    // Verify access token
    const accessTokenValid = await verifyAccessToken(tokens.accessToken);
    if (!accessTokenValid.isValid) {
      // Access token is invalid, try to refresh it
      const refreshTokenValid = await verifyRefreshToken(tokens.refreshToken);
      if (refreshTokenValid.isValid) {
        // Use refresh token to get new access token
        const newAccessToken = await refreshAccessToken(tokens.refreshToken);
        // Save the new access token
        await saveTokens({ accessToken: newAccessToken, refreshToken: tokens.refreshToken });
        return true; // Access token refreshed successfully
      } else {
        return false; // Refresh token is also invalid
      }
    }
    
    return true; // Access token is valid
  } catch (error) {
    console.error('Error verifying tokens:', error);
    return false; // Error occurred during verification
  }
}