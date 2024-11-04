import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {useDispatch} from "react-redux";
import {receiveCollectionPhoto, receiveCollectionData} from "../store/actions/PhotoAction";
import {HomeKey} from "../utills/Api";
import {useSelector} from "react-redux";
import logo1 from "../assets/images/image_2.png";
import MasonryList from "@react-native-seoul/masonry-list";
import {SearchedImages} from "../store/actions/PhotoAction";

const Photos = ({route}) => {
  const {id, total_photos, title, user} = route.params;
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const collectionPhotos = useSelector(state => state.photo.collectionPhotos)
  const collections = useSelector(state => state.album.collections)
  const userData = useSelector(state => state.modal.userData);
  const collectionData = useSelector(state => state.photo.collectionData)
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(20);
  const searchArray = useSelector(state => state.photo.searchArray);

  useEffect(() => {
    dispatch(receiveCollectionPhoto({id, client_id: HomeKey, page, per_page}))
    dispatch(receiveCollectionData({client_id: HomeKey, id}))
  }, [collectionPhotos,]);


  useEffect(() => {
    if (value) {
      dispatch(SearchedImages({page, per_page, client_id: HomeKey, query: value, collections:id}));
    }
  }, [page, value]);


  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };


  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logo1} style={{width: 53, height: 53,}}/>
          <Image source={{uri: userData.profile_image.medium}}
                 style={{width: 50, height: 50, borderRadius: 50, marginRight: 20}}/>
        </View>
        <View style={{marginBottom: 30}}>
          {collectionData ? (<>
            <View style={{marginTop: 20}}>
              <Text style={{fontSize: 24, color: "#151C2A"}}>{collectionData.title}</Text>
              <Text style={{color: "#7E8EAA", fontSize: 16, marginTop: 5}}>{collectionData.total_photos}-Curated
                By {collectionData.user.username}</Text>
            </View>
          </>) : (
            <View style={{marginTop: 20,}}>
              <Text style={{fontSize: 24, color: "#151C2A"}}>Collection Name</Text>
              <Text style={{color: "#7E8EAA", fontSize: 16}}>20-Curated By UserName </Text>
            </View>)}
        </View>

        <TextInput placeholder="Search photos" style={styles.search} value={value} onChangeText={setValue}
                   placeholderTextColor="black"/>


        <MasonryList
          data={!value ? collectionPhotos : searchArray}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (

            <Image style={{
              height: item.height / 30,
              alignSelf: 'stretch',
              borderRadius: 6,
              margin: 5,
            }} resizeMode={'cover'} source={{uri: item.urls.small}}/>
          )}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
        />
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
    marginHorizontal: 20,
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  search: {
    width: 315,
    height: 45,
    marginTop: 16,
    marginHorizontal: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#7E8EAA',
    borderRadius: 50,
    paddingLeft: 20,
    color: "black",
    marginBottom: 20
  }
});

export default Photos;
