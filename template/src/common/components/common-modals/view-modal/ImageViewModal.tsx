import * as React from 'react';
import { Modal, Pressable } from 'react-native';
import { CommonBox, CommonImage } from '@components';
import { Pixelate } from '@utils';
import { useTheme } from '@themes';
import { useModalStyles } from './Styles';

type Props = {
  status: boolean;
  source: string;
  onPressClose: () => void;
};

export const ImageViewModal: React.FC<Props> = ({
  status,
  source,
  onPressClose,
}) => {
  const styles = useModalStyles();
  const { theme } = useTheme();

  if(!status) {
    return null;
  };
  
  return (
    <Modal
      visible={status}
      transparent
      animationType="slide"
      onRequestClose={onPressClose}
      statusBarTranslucent={true}>
      <CommonBox moreStyles={styles.container}>
        <CommonImage
          sourceType="url"
          source={source}
          width={Pixelate.screenWidth}
          height={Pixelate.screenWidth + 50}
        />
        <Pressable style={styles.closeButtonContainer} onPress={onPressClose}>
          <CommonImage
            sourceType="localSvg"
            svgSource="close"
            width={22}
            height={22}
            color={theme.colors.black}
          />
        </Pressable>
      </CommonBox>
    </Modal>
  );
};
