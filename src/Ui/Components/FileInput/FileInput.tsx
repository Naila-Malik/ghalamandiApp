import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import React, {FC, useCallback} from 'react';
import DocumentPicker, {
  type DocumentPickerResponse,
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker';
import {getFileExtension, getFileIcon} from '../../../Utils/helper';
import {useDocument} from '../../../Hooks/use-document';
import {
  AppColors,
  AppImages,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import DocumentViewer from '../../Modals/document-viewer';

interface FileInputProps extends ViewProps {
  onChange: (attachments: DocumentPickerResponse[]) => void;
  value?: DocumentPickerResponse[];
}

const FileInput: FC<FileInputProps> = ({onChange, value}) => {
  const documentViewer = useDocument<string>();

  const handleOpenDocument = useCallback(
    (uri: string) => {
      console.log('uri-----------', uri);
      documentViewer.handleOpen(uri);
    },
    [documentViewer],
  );

  const handleError = (err: unknown) => {
    if (isCancel(err)) {
      console.warn('cancelled');
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  const handleDocumentSelect = async () => {
    DocumentPicker.pick({
      allowMultiSelection: true,
      type: [types.pdf, types.images],
      copyTo: 'documentDirectory',
    })
      .then(data => {
        if (value !== undefined) {
          onChange([...value, ...data]);
        } else {
          onChange(data);
        }
      })
      .catch(handleError);
  };

  const handleDocumentDelete = useCallback(
    (id: number) => {
      console.log('value-----------', value, id);
      if (value !== undefined) {
        let newAttachments = [...value];
        newAttachments = newAttachments.filter(a => value.indexOf(a) !== id);
        onChange(newAttachments);
      }
    },
    [value],
  );
  // console.log('value---------', value);
  return (
    <View style={styles.root}>
      {value?.length ? (
        <View style={{marginTop: normalized(12)}}>
          <Text style={styles.title1}>Documents</Text>
          {value?.map((attachment, index) => {
            const extension = getFileExtension(attachment.name);
            return (
              <View
                key={index}
                style={[AppStyles.centeredCommon, styles.attachment_item]}>
                <View
                  style={[AppStyles.horiCommon, {marginRight: normalized(24)}]}>
                  <TouchableOpacity
                    onPress={() => {
                      handleOpenDocument(attachment.fileCopyUri ?? '');
                    }}>
                    <Text style={styles.title} numberOfLines={1}>
                      {attachment.name}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{paddingRight: 0, marginRight: 0}}
                  onPress={() => {
                    handleDocumentDelete(index);
                  }}>
                  <Image
                    source={AppImages.Common.crossIcon}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
          <View style={{marginVertical: normalized(12), alignSelf: 'flex-end'}}>
            <TouchableOpacity onPress={handleDocumentSelect}>
              <View style={AppStyles.horiCommon}>
                <Text style={styles.title}>Add</Text>
                <View style={styles.plusBG}>
                  <Image
                    source={AppImages.BottomTab.PlusIcon}
                    style={styles.icon}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={{width: '100%'}}
          onPress={handleDocumentSelect}>
          <View style={[{justifyContent: 'center'}, styles.drop_box]}>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Image
                source={AppImages.Common.attachmentIcon}
                // style={styles.icon}
              />
            </View>
            <Text style={styles.title}>Click to Upload Crop Photos</Text>
            <Text style={styles.title2}>Supporting files : JPG, PNG, PDF</Text>
          </View>
        </TouchableOpacity>
      )}
      {/* <DocumentViewer
        open={documentViewer.open}
        onClose={documentViewer.handleClose}
        uri={documentViewer.data}
      /> */}
    </View>
  );
};

export default FileInput;

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  drop_box: {
    marginVertical: normalized(24),
    borderWidth: 1,
    borderColor: AppColors.green.dark,
    borderRadius: normalized(16),
    borderStyle: 'dashed',
    height: normalized(104),
  },
  attachment_item: {
    marginTop: normalized(12),
    paddingHorizontal: normalized(20),
    paddingVertical: normalized(12),
    borderRadius: normalized(12),
    borderWidth: 1,
    borderColor: AppColors.grey.greyLighter,
    backgroundColor: AppColors.bgColor,
    flexDirection: 'row',
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: AppColors.grey.greyDark,
    textAlign: 'center',
  },
  title1: {
    fontSize: 18,
    fontWeight: '800',
    color: AppColors.grey.greyDark,
  },
  title2: {
    fontSize: 10,
    fontWeight: '300',
    color: AppColors.grey.greyDark,
    textAlign: 'center',
  },
  icon: {
    width: normalized(20),
    height: hv(20),
    resizeMode: 'contain',
  },
  plusBG: {
    backgroundColor: AppColors.grey.grey,
    width: normalized(25),
    height: hv(25),
    borderRadius: normalized(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: normalized(5),
  },
});
