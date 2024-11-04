import React, {useEffect} from 'react';
import {Image, Text, View, StyleSheet, Pressable, TouchableOpacity, Alert} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import BottomSheet from '@gorhom/bottom-sheet';
import {receiveUserData, receiveUserImages, setCurrentPhoto} from "../store/actions/ModalAction";
import {HomeKey} from "../utills/Api";
import download from "../assets/images/download.png"
import MasonryList from "@react-native-seoul/masonry-list";
import {useNavigation} from "@react-navigation/native";
import * as RNFS from "react-native-fs";


const Modal = () => {
  const currentPhoto = useSelector(state => state.modal.currentPhoto);
  const username = useSelector(state => state.modal.username)
  const userData = useSelector(state => state.modal.userData);
  const userImages = useSelector(state => state.modal.userImages);
  const navigate = useNavigation()
  const dispatch = useDispatch()


  const downloadFile = async () => {
    try {
      const url = currentPhoto;
      const filePath = `${RNFS.DownloadDirectoryPath}/${Date.now()}.jpg;`

      RNFS.downloadFile({
        fromUrl: url,
        toFile: filePath,
        background: true,
        discretionary: true,
        progress: (res) => {
          const progress = (res.bytesWritten / res.contentLength) * 100;
          Alert.alert(`Download Progress:  ${Math.ceil(progress)}%`);
        },
      })
        .promise.then((response) => {
        if (response.statusCode === 200) {
          Alert.alert(`File downloaded!, Saved to: ${filePath}`);
        } else {
          Alert.alert('Download failed', 'Something went wrong while downloading the file.');
        }
      })
        .catch((err) => {
          Alert.alert('Download error', 'An error occurred while downloading the file.');
        });
    } catch (error) {
      Alert.alert('Download error:', error);
      Alert.alert('Download error', 'An error occurred while downloading the file.');
    }
  };


  useEffect(() => {
    if (username) {
      dispatch(receiveUserData({username, client_id: HomeKey}))
      dispatch(receiveUserImages({username, client_id: HomeKey}))
    }
  }, [username]);

  const PhotoClick = (item) => {
    dispatch(setCurrentPhoto(item.urls.small))
  }

  const AlubmsNavigate = () => {
    navigate.navigate("Albums")
  }


  return (
    <View>
      <Image
        source={{uri: currentPhoto}}
        style={{width: '100%', height: '100%', resizeMode: 'cover'}}
      />
      <BottomSheet index={0} snapPoints={['12%', '40%', '70%', "90%"]}>
        <View style={styles.wrapper}>
          {userData && userData.profile_image ? (
            <Pressable style={styles.header} onPress={AlubmsNavigate}>
              <Image source={{uri: userData.profile_image.medium}} style={{width: 50, height: 50, borderRadius: 50}}/>
              <View style={{marginLeft: 15}}>
                <Text style={styles.modalTitle}>
                  {userData.name}
                </Text>
                <Text style={styles.modalUserName}>
                  @{userData.username}
                </Text>
              </View>
            </Pressable>
          ) : null}
          <Pressable onPress={downloadFile}>
            <View style={styles.modalIconBlock}>
              <Image source={download} style={{width: 25, height: 25, resizeMode: "cover"}}/>
            </View>
          </Pressable>

        </View>
        <Text style={{marginTop: 20, marginBottom: 15, marginLeft: 10}}>Related Photos</Text>
        <MasonryList
          data={userImages}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => PhotoClick(item)}>
              <Image style={{
                height: item.height / 40,
                alignSelf: 'stretch',
                borderRadius: 4,
                margin: 5,
              }} resizeMode={'cover'} source={{uri: item.urls.small}}/>
            </TouchableOpacity>
          )}

        />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 250,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#fff',
    marginLeft: 30,
    marginTop: 10,
  },
  modalTitle: {
    fontSize: 16,
    color: "black",
  },
  modalUserName: {
    fontSize: 13,
    color: "#7E8EAA"
  },
  modalIconBlock: {
    display: "flex",
    flexDirection: "row",
    marginTop: 18
  }
})

export default Modal;
