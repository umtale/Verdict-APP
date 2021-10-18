import { Dimensions } from 'react-native';

export function wp(percentage: number): number {
  const { width: viewportWidth } = Dimensions.get('window');
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
