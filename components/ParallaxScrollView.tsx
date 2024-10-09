import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';

const HEADER_HEIGHT = 120;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);



  return (
    <ThemedView style={styles.container}>
    {/* Fixed header */}
    <Animated.View
      style={[
        styles.header,
        { backgroundColor: '#93C572' }, // Fixed grey background
      ]}>
    
    </Animated.View>

    {/* Scroll content below the header */}
    <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}>
      <ThemedView style={styles.content}>{children}</ThemedView>
    </Animated.ScrollView>
  </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    position: 'absolute', // Fix header at the top
    top: 0,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
