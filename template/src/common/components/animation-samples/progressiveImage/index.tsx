import { View } from 'react-native';
import { CommonImage } from '@components';

export const ProgressiveImage = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <CommonImage
        sourceType="url"
        source="https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ"
        width={500}
        height={600}
        resizeMode="contain"
      />
      <CommonImage
        sourceType="localSvg"
        svgSource="placeholder"
        width={100}
        height={100}
        moreStyles={{marginTop: 20}}
      />
    </View>
  );
};
