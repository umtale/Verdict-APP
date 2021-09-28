import { PixelRatio } from 'react-native';
import Config from 'react-native-config';

export function cdnUrl(url: string, w: number, h: number) {
  if (!url) {
    return;
  }

  if (!url.startsWith(Config.CDN_DOMAIN)) {
    if (!url.startsWith('/')) {
      url = `/${url}`;
    }

    url = `${Config.CDN_DOMAIN}${url}`;
  }

  w = PixelRatio.getPixelSizeForLayoutSize(Math.floor(w));
  h = PixelRatio.getPixelSizeForLayoutSize(Math.floor(h));

  const [baseUrl] = url.split('?');
  url = `${baseUrl}?w=${w}&h=${h}`;

  return url;
}
