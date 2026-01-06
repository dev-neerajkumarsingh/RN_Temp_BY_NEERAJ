import * as React from 'react';
import {Modal, Pressable, Linking} from 'react-native';
import {CommonBox, CommonImage} from '@components';
import { useTheme } from '@themes';
import { useModalStyles } from './Styles';
// import Pdf from 'react-native-pdf';

type Props = {
  status: boolean;
  source: string;
  downloadStatus?: boolean;
  onPressClose: () => void;
};

export const WebViewModal: React.FC<Props> = ({
  status,
  source,
  downloadStatus,
  onPressClose,
}) => {
  const {theme} = useTheme();
  const styles = useModalStyles();

  const onPressDownload = () => {
    Linking.openURL(`${source}`);
  };

  if (!status) {
    return null;
  };
  
  return (
    <Modal
      visible={status}
      transparent
      animationType="slide"
      onRequestClose={onPressClose}>
      <CommonBox>
        {/* <Pdf
          source={{uri: source}}
          onError={error => {
            console.log(error);
          }}
          style={styles.webcontainer}
          trustAllCerts={false}
        /> */}
        <Pressable style={styles.webcloseButtonContainer} onPress={onPressClose}>
          <CommonImage
            sourceType="localSvg"
            svgSource="close"
            width={20}
            height={20}
            color={theme.colors.black}
          />
        </Pressable>
        {Boolean(downloadStatus) && (
          <Pressable
            style={styles.webdownloadButtonContainer}
            onPress={onPressDownload}>
            <CommonImage
              sourceType="localSvg"
              svgSource="download"
              width={26}
              height={26}
              color={theme.colors.primary}
            />
          </Pressable>
        )}
      </CommonBox>
    </Modal>
  );
};
