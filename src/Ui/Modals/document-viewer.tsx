import {Image, Modal, StyleSheet, View} from 'react-native';
import React, {type FC} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Pdf from 'react-native-pdf';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  AppColors,
  AppImages,
  ScreenSize,
  hv,
  normalized,
} from '../../Utils/AppConstants';
import {AppStyles} from '../../Utils/AppStyles';

interface DocumentViewerProps {
  open?: boolean;
  onClose?: () => void;
  uri?: string;
}

const DocumentViewer: FC<DocumentViewerProps> = ({open, onClose, uri}) => {
  const insets = useSafeAreaInsets();
  let fileType: any = uri ? uri?.split('.') : '';
  fileType =
    fileType && fileType?.length > 0 ? fileType[fileType?.length - 1] : '';

  const source = {
    uri,
    cache: true,
  };
  return open ? (
    <Modal>
      <View
        style={[styles.root, AppStyles.horiCommon, {marginTop: insets.top}]}>
        {fileType === 'pdf' ? (
          <Pdf trustAllCerts={false} source={source} style={styles.pdf} />
        ) : (
          <Image style={styles.pdf} resizeMethod="resize" source={{uri: uri}} />
        )}
        <TouchableOpacity onPress={onClose} style={styles.iconButton}>
          <Image source={AppImages.Common.crossIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </Modal>
  ) : null;
};

export default DocumentViewer;

const styles = StyleSheet.create({
  root: {
    width: ScreenSize.width,
    height: ScreenSize.height,
    backgroundColor: 'yellow',
  },
  pdf: {
    flex: 1,
    width: ScreenSize.width,
    height: ScreenSize.height,
  },
  iconButton: {
    position: 'absolute',
    top: normalized(-350),
    right: normalized(20),
    width: normalized(30),
    height: hv(30),
  },
  icon: {
    width: normalized(20),
    height: hv(20),
    resizeMode: 'contain',
  },
});
