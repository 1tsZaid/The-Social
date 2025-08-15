// sendBase64Image.ts
import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";

export async function imageUriToBase64(imageUri: string | undefined): Promise<string | undefined> {
  if (!imageUri) return undefined;

  // Mobile (iOS / Android)
  if (Platform.OS !== "web") {
    return await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
  }

  // Web
  return await new Promise<string | undefined>((resolve, reject) => {
    fetch(imageUri)
      .then(res => res.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result?.toString(); // not removing "data:*/*;base64,"
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      })
      .catch(reject);
  });
}
