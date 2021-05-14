import { PixelRatio } from 'react-native';

export function cdnUrl(url: string, w: number, h: number) {
  if (!url) {
    return;
  }

  w = PixelRatio.getPixelSizeForLayoutSize(Math.floor(w));
  h = PixelRatio.getPixelSizeForLayoutSize(Math.floor(h));

  const [baseUrl] = url.split('?');
  url = `${baseUrl}?w=${w}&h=${h}`;

  return url;
}
