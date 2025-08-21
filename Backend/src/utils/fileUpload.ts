import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';

export class FileUploadService {
  private baseUploadDir = path.join(process.cwd(), 'uploads');
  private subDir: string;

  constructor(subDir: string) {
    this.subDir = subDir;
    this.ensureUploadDir();
  }

  private get uploadDir() {
    return path.join(this.baseUploadDir, this.subDir);
  }

  private async ensureUploadDir(): Promise<void> {
    try {
      await fs.access(this.uploadDir);
    } catch {
      await fs.mkdir(this.uploadDir, { recursive: true });
    }
  }

  getFileWithPng(inputPath: string): string | null {
    const fullPath = path.join(this.uploadDir, inputPath);
    const pngFilePath = fullPath + '.png';

    if (fsSync.existsSync(pngFilePath)) {
      return this.subDir + '/' + inputPath + '.png'; // return relative path
    } else {
      return null;
    }
  }

  async saveBase64Image(id: string, base64Data: string): Promise<string> {
    // Extract file extension from base64 data
    const matches = base64Data.match(/^data:image\/([a-zA-Z]*);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 image format');
    }

    const extension = matches[1];
    const imageData = matches[2];

    // Validate image type
    const allowedTypes = ['jpeg', 'jpg', 'png', 'webp'];
    if (!allowedTypes.includes(extension.toLowerCase())) {
      throw new Error('Invalid image type. Only JPEG, PNG, and WebP are allowed');
    }

    // Generate unique filename
    const filename = `${id}.${extension}`;
    const filepath = path.join(this.uploadDir, filename);

    // Convert base64 to buffer and save
    const buffer = Buffer.from(imageData, 'base64');

    // Check file size (limit to 5MB)
    if (buffer.length > 5 * 1024 * 1024) {
      throw new Error('Image size must be less than 5MB');
    }

    await fs.writeFile(filepath, buffer);

    return path.join(this.subDir, filename); // return relative path (e.g., profiles/abc.png)
  }

  async deleteImage(id: string): Promise<void> {
    if (!this.getFileWithPng(id)) {
      return;
    }

    const filename = `${id}.png`;
    const filepath = path.join(this.uploadDir, filename);

    try {
      await fs.unlink(filepath);
    } catch (error) {
      console.warn(`Failed to delete image: ${filepath}`, error);
    }
  }
}

// Example: Create services for different dirs
export const profileUploadService = new FileUploadService('profiles');
export const postUploadService = new FileUploadService('posts');
export const communityUploadService = new FileUploadService('communities');
