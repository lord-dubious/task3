export interface OptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'jpeg' | 'webp' | 'png';
  maxSizeKB?: number;
}

export interface OptimizedMedia {
  file: File;
  originalSize: number;
  optimizedSize: number;
  compressionRatio: number;
  dimensions: { width: number; height: number };
}

export class MediaOptimizer {
  private static canvas: HTMLCanvasElement | null = null;
  private static ctx: CanvasRenderingContext2D | null = null;

  private static getCanvas(): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d')!;
    }
    return { canvas: this.canvas, ctx: this.ctx! };
  }

  static async optimizeImage(
    file: File,
    options: OptimizationOptions = {}
  ): Promise<OptimizedMedia> {
    const {
      maxWidth = 1920,
      maxHeight = 1080,
      quality = 0.85,
      format = 'jpeg',
      maxSizeKB = 2048
    } = options;

    return new Promise((resolve, reject) => {
      const img = new Image();
      const originalSize = file.size;

      img.onload = () => {
        try {
          const { canvas, ctx } = this.getCanvas();
          
          // Calculate new dimensions while maintaining aspect ratio
          const { width: newWidth, height: newHeight } = this.calculateDimensions(
            img.width,
            img.height,
            maxWidth,
            maxHeight
          );

          canvas.width = newWidth;
          canvas.height = newHeight;

          // Clear canvas and draw image
          ctx.clearRect(0, 0, newWidth, newHeight);
          ctx.drawImage(img, 0, 0, newWidth, newHeight);

          // Convert to blob with compression
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Failed to optimize image'));
                return;
              }

              // Check if we need further compression
              if (blob.size > maxSizeKB * 1024 && quality > 0.1) {
                // Recursively compress with lower quality
                const newFile = new File([blob], file.name, { type: blob.type });
                this.optimizeImage(newFile, {
                  ...options,
                  quality: Math.max(0.1, quality - 0.1)
                }).then(resolve).catch(reject);
                return;
              }

              const optimizedFile = new File([blob], file.name, {
                type: blob.type,
                lastModified: Date.now()
              });

              resolve({
                file: optimizedFile,
                originalSize,
                optimizedSize: blob.size,
                compressionRatio: ((originalSize - blob.size) / originalSize) * 100,
                dimensions: { width: newWidth, height: newHeight }
              });
            },
            format === 'png' ? 'image/png' : `image/${format}`,
            quality
          );
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }

  static async optimizeVideo(
    file: File,
    options: OptimizationOptions = {}
  ): Promise<OptimizedMedia> {
    // For videos, we'll implement basic optimization
    // In a production app, you might want to use FFmpeg.wasm for video compression
    const { maxSizeKB = 10240 } = options; // 10MB default for videos

    if (file.size <= maxSizeKB * 1024) {
      // Video is already within size limits
      return {
        file,
        originalSize: file.size,
        optimizedSize: file.size,
        compressionRatio: 0,
        dimensions: { width: 0, height: 0 } // Would need video analysis for actual dimensions
      };
    }

    // For now, we'll return the original file
    // In production, implement video compression here
    return {
      file,
      originalSize: file.size,
      optimizedSize: file.size,
      compressionRatio: 0,
      dimensions: { width: 0, height: 0 }
    };
  }

  private static calculateDimensions(
    originalWidth: number,
    originalHeight: number,
    maxWidth: number,
    maxHeight: number
  ): { width: number; height: number } {
    let { width, height } = { width: originalWidth, height: originalHeight };

    // Calculate scaling factor
    const widthRatio = maxWidth / width;
    const heightRatio = maxHeight / height;
    const ratio = Math.min(widthRatio, heightRatio, 1); // Don't upscale

    width = Math.round(width * ratio);
    height = Math.round(height * ratio);

    return { width, height };
  }

  static async optimizeFile(
    file: File,
    options: OptimizationOptions = {}
  ): Promise<OptimizedMedia> {
    if (file.type.startsWith('image/')) {
      return this.optimizeImage(file, options);
    } else if (file.type.startsWith('video/')) {
      return this.optimizeVideo(file, options);
    } else {
      throw new Error('Unsupported file type for optimization');
    }
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}