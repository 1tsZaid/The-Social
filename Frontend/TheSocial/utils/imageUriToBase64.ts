// sendBase64Image.ts
import * as FileSystem from "expo-file-system";

export async function imageUriToBase64(imageUri: string) {
  const base64Data = await FileSystem.readAsStringAsync(imageUri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return base64Data;
}
