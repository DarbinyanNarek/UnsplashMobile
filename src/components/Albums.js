import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Image, Pressable, FlatList} from "react-native";
import logo1 from '../assets/images/image_2.png';
import collectionsLogo from "../assets/images/Collections.png"
import {useDispatch, useSelector} from "react-redux";
import {HomeKey} from "../utills/Api";
import {useNavigation} from '@react-navigation/native';
import {receiveCollection} from "../store/actions/AlbumAction";


const Albums = ({navigation}) => {
  const username = useSelector(state => state.modal.username)
  const userData = useSelector(state => state.modal.userData);
  const collections = useSelector(state => state.album.collections)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(receiveCollection({username, client_id: HomeKey}))
    console.log(collections)
  }, [username])


  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logo1} style={{width: 53, height: 53,}}/>
          <Image source={{uri: userData.profile_image.medium}}
                 style={{width: 50, height: 50, borderRadius: 50, marginRight: 20}}/>
        </View>
        <Image source={collectionsLogo} style={{width: 315, height: 91, marginTop: 30}}/>

        <FlatList data={collections} renderItem={({item}) =>
          <Pressable onPress={() => navigation.navigate("Photo", {id: item.id})}>
            <View>
              <Image source={{uri: item.preview_photos[0].urls.small}}
                     style={{width: 335, height: 265, marginTop: 60, borderRadius: 5}}/>
              <Text style={{fontSize: 17, color: "#151C2A", marginTop: 15}}>{item.title} </Text>
              <Text style={{fontSize: 14, color: "#7E8EAA"}}>{`${item.total_photos} photos - Curated by ${item.user.name}`}</Text>
            </View>
          </Pressable>}/>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column"
  },
  container: {
    maxWidth: 350,
    width: '100%',
    marginTop: 40,
    marginLeft: 30,
    marginRight: 30,
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
});

export default Albums;
