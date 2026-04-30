import * as React from 'react';
import { Modal, Pressable } from 'react-native';
import { CommonBox, CommonImage } from '@components';
import { Pixelate } from '@utils';
import { useModalStyles } from './Styles';

type Props = {
  status: boolean;
  source: string;
  onPressClose: () => void;
};

const ImageViewModalComponent: React.FC<Props> = ({
  status,
  source,
  onPressClose,
}) => {
  const styles = useModalStyles();

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
            color={'black'}
          />
        </Pressable>
      </CommonBox>
    </Modal>
  );
};

export const ImageViewModal = React.memo(ImageViewModalComponent);