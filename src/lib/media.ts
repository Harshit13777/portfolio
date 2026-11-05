/**
 * Smart Media & Video Normalizer Utility
 * 
 * Automatically transforms standard YouTube, Loom, and MP4 links
 * into responsive, production-ready embeds without requiring manual URL editing.
 */

export interface NormalizedMedia {
  type: 'youtube' | 'loom' | 'html5_video' | 'unknown';
  embedUrl: string;
  isEmbeddable: boolean;
}

export function normalizeVideoUrl(rawUrl?: string): NormalizedMedia {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return { type: 'unknown', embedUrl: '', isEmbeddable: false };
  }

  const trimmed = rawUrl.trim();

  // 1. YouTube standard URL: https://www.youtube.com/watch?v=VIDEO_ID
  const youtubeWatchMatch = trimmed.match(/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);
  if (youtubeWatchMatch && youtubeWatchMatch[1]) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${youtubeWatchMatch[1]}?autoplay=1&rel=0`,
      isEmbeddable: true,
    };
  }

  // 2. YouTube short URL: https://youtu.be/VIDEO_ID
  const youtubeShortMatch = trimmed.match(/(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (youtubeShortMatch && youtubeShortMatch[1]) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${youtubeShortMatch[1]}?autoplay=1&rel=0`,
      isEmbeddable: true,
    };
  }

  // 3. YouTube already in embed format: https://www.youtube.com/embed/VIDEO_ID
  if (trimmed.includes('youtube.com/embed/')) {
    const cleanUrl = trimmed.includes('?') ? trimmed : `${trimmed}?autoplay=1&rel=0`;
    return {
      type: 'youtube',
      embedUrl: cleanUrl,
      isEmbeddable: true,
    };
  }

  // 4. Loom share link: https://www.loom.com/share/VIDEO_ID
  const loomShareMatch = trimmed.match(/loom\.com\/share\/([a-zA-Z0-9_-]+)/);
  if (loomShareMatch && loomShareMatch[1]) {
    return {
      type: 'loom',
      embedUrl: `https://www.loom.com/embed/${loomShareMatch[1]}`,
      isEmbeddable: true,
    };
  }

  // 5. Loom already in embed format
  if (trimmed.includes('loom.com/embed/')) {
    return {
      type: 'loom',
      embedUrl: trimmed,
      isEmbeddable: true,
    };
  }

  // 6. Direct MP4, WebM, OGG video file (local or remote)
  if (
    trimmed.endsWith('.mp4') ||
    trimmed.endsWith('.webm') ||
    trimmed.endsWith('.ogg') ||
    trimmed.includes('.mp4?') ||
    trimmed.startsWith('/videos/')
  ) {
    return {
      type: 'html5_video',
      embedUrl: trimmed,
      isEmbeddable: true,
    };
  }

  // Default fallback
  return {
    type: 'unknown',
    embedUrl: trimmed,
    isEmbeddable: true,
  };
}
