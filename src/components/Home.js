import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Image, TextInput,  Pressable} from 'react-native';
import logo1 from '../assets/images/image_2.png';
import logo2 from '../assets/images/Title.png';
import {useDispatch, useSelector,} from "react-redux";
import {getPhoto, searchPhoto} from "../store/actions/HomeAction";
import {HomeKey} from "../utills/Api";
import MasonryList from "@react-native-seoul/masonry-list"
import {useNavigation} from '@react-navigation/native';
import {setCurrentPhoto, setUserName} from "../store/actions/ModalAction";


const Home = () => {
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(20);
  const photos = useSelector(state => state.home.photos);
  const currentPhoto = useSelector(state => state.modal.currentPhoto);
  const searchArray = useSelector(state => state.home.searchArray);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true)
  const isLoading = useRef(true);
  const navigate = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPhoto({page, per_page, client_id: HomeKey}));
  }, [page])

  useEffect(() => {
    if (value) {
      dispatch(searchPhoto({page, per_page, client_id: HomeKey, query: value}));
    }
  }, [page, value]);


  const openModal = (item) => {
    dispatch(setCurrentPhoto(item.urls.small))
    dispatch(setUserName(item.user.username))
    navigate.navigate("Modal")
  }




  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };




  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logo1} style={{width: 53, height: 53, marginLeft: 5}}/>
          <Image source={logo2} style={{width: 162, height: 68, marginTop: 15, marginLeft: 125}}/>
        </View>
        <TextInput placeholder="Search photos" style={styles.search} value={value} onChangeText={setValue}
                   placeholderTextColor="black"/>
        <MasonryList
          data={!value ? photos : searchArray}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <Pressable onPress={() => openModal(item)}>
              <Image style={{
                height: item.height / 30,
                alignSelf: 'stretch',
                borderRadius: 6,
                margin: 5,
              }} resizeMode={'cover'} source={{uri: item.urls.small}}/>
            </Pressable>

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
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#fff',
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


export default Home;
