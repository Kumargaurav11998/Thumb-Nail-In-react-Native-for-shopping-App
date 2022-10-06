import {Avatar} from '@rneui/base';
import React, {useRef, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Text,
} from 'react-native';
const {width, height} = Dimensions.get('screen');
import {data, Images} from '../Helper/Constant';
import {colors} from '../Utils/Colors';
import {radious} from '../Utils/Size';
import Shimmer from 'react-native-shimmer';
function ImageWithThumbNail(props) {
  const Topref = useRef();
  const thumbref = useRef();
  const [isindex, setindex] = useState(0);
  const setActiveIndex = actindex => {
    setindex(actindex);
    Topref?.current?.scrollToOffset({
      offset: actindex * (width / 1.5),
      Animated: true,
    });
  };
  return (
    <SafeAreaView style={[styles.container]}>
      <FlatList
        ListEmptyComponent={
          <>
            <Shimmer style={[styles.conterimg, {backgroundColor: colors.grey}]}>
              {/* <Text style={[styles.loadingtext]}>Daily Housing</Text> */}
            </Shimmer>
          </>
        }
        ref={Topref}
        style={[styles.FlatListstyle]}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        data={props.data}
        onMomentumScrollEnd={ev => {
          setActiveIndex(
            Math.floor(ev.nativeEvent.contentOffset.x / (width / 1.5)),
          );
        }}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <View style={[styles.mainview]}>
              <Avatar
                /// size={180}
                avatarStyle={styles.avatarimg}
                source={{uri: item.img}}
                containerStyle={styles.conterimg}
              />
            </View>
          );
        }}
      />
      <FlatList
        //   ref={thumbref}
        ListEmptyComponent={
          <>
            <View style={[styles.contnerthumbnail]}></View>
          </>
        }
        style={[{alignSelf: 'center'}]}
        horizontal
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        data={props.data}
        contentContainerStyle={{margin: 10}}
        renderItem={({item, index}) => {
          return (
            <View style={[styles.thumbmainview]}>
              <Avatar
                onPress={() => setActiveIndex(index)}
                /// size={180}
                avatarStyle={styles.avatarimg}
                source={{uri: item.img}}
                containerStyle={[
                  styles.contnerthumbnail,
                  {
                    borderColor:
                      isindex == index ? colors.AppDefaultColor : 'transparent',
                  },
                ]}
              />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

export default ImageWithThumbNail;

const styles = StyleSheet.create({
  mainview: {
    alignSelf: 'center',
  },
  avatarimg: {
    resizeMode: 'cover',
    borderRadius: radious.borderradious,
  },
  FlatListstyle: {
    width: width / 1.5,
    alignSelf: 'center',
    backgroundColor: colors.white,
  },
  conterimg: {
    height: 300,
    width: width / 1.5,
    alignSelf: 'center',
  },
  container: {
    width: width,
    backgroundColor: colors.white,
    marginTop: 10,
  },
  contnerthumbnail: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderRadius: radious.borderradious,
  },
  thumbmainview: {margin: 10},
});
