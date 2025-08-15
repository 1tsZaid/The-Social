import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';

export class FileUploadService {
  private uploadDir = path.join(process.cwd(), 'uploads', 'profiles');

  constructor() {
    this.ensureUploadDir();
  }

  private async ensureUploadDir(): Promise<void> {
    try {
      await fs.access(this.uploadDir);
    } catch {
      await fs.mkdir(this.uploadDir, { recursive: true });
    }
  }

  getFileWithPng(inputPath: string): string | null {
    console.log("inputPath", inputPath);

    const fullPath = path.join(this.uploadDir, inputPath);
    console.log("fullPath after join", fullPath);

    const pngFilePath = fullPath + '.png';
    console.log("final file path", pngFilePath);

    if (fsSync.existsSync(pngFilePath)) {
        console.log("File exists:", inputPath + '.png');
        return inputPath + '.png';
    } else {
        console.log("File does not exist:", pngFilePath);
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

    return filename;
  }

  async deleteImage(id: string): Promise<void> {
    if (!id || !id.startsWith('/uploads/profiles/')) {
      return;
    }

    const filename = path.basename(id);
    const filepath = path.join(this.uploadDir, filename);

    try {
      await fs.unlink(filepath);
    } catch (error) {
      console.warn(`Failed to delete image: ${filepath}`, error);
    }
  }
}

export const fileUploadService = new FileUploadService();