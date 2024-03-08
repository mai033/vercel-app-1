import Compressor from 'compressorjs';

export function resizeImage(file: File, maxFileSize: number) {
  return new Promise((resolve, reject) => {
    if (file.size <= maxFileSize) {
      console.log(
        'File is already under the maximum size limit. No resizing needed.'
      );
      resolve(file);
      return;
    }

    console.log(
      `Original file size is ${(file.size / 1024 / 1024).toFixed(
        2
      )} MB. Resizing process started...`
    );

    let quality = 0.8; // Start with high quality
    const minQuality = 0.1; // Minimum acceptable quality
    const qualityStep = 0.1; // Step to decrease quality by in each iteration

    const attemptResize = (quality: number) => {
      new Compressor(file, {
        quality,
        maxWidth: 1920,
        maxHeight: 1080,
        convertSize: 5000000, // Convert images over 5MB to JPEG
        success(resizedFile) {
          console.log(
            `Attempt with quality ${quality.toFixed(
              2
            )} resulted in file size ${(resizedFile.size / 1024 / 1024).toFixed(
              2
            )} MB`
          );

          if (resizedFile.size <= maxFileSize || quality <= minQuality) {
            console.log(
              'Resizing complete. Final file meets the size requirements.'
            );
            resolve(resizedFile);
          } else {
            quality -= qualityStep; // Decrease quality for another attempt
            console.log(
              `Resizing attempt did not meet the size requirements. Trying again with quality ${quality.toFixed(
                2
              )}`
            );
            attemptResize(quality);
          }
        },
        error(err) {
          console.error('Compression error:', err);
          reject(err);
        },
      });
    };

    // Start the resizing attempt
    attemptResize(quality);
  });
}
