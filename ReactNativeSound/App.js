import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

var Sound = require('react-native-sound');
import dings from './src/assets/tension.mp3';

const Play = {
  uri: 'https://www.friidesigns.com/wp-content/uploads/2018/11/white-play-icon-png-6.png',
};
const Pause = {
  uri: 'https://img.icons8.com/external-kmg-design-flat-kmg-design/64/000000/external-pause-cinema-kmg-design-flat-kmg-design.png',
};

Sound.setCategory('Playback');

var audio = new Sound(dings, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log(
    'duration in seconds: ' +
      audio.getDuration() +
      'number of channels: ' +
      audio.getNumberOfChannels(),
  );
});
const App = () => {
  const [playing, setPlaying] = useState();
  useEffect(() => {
    audio.setVolume(1);
    return () => {
      audio.release();
    };
  }, []);
  const playPause = () => {
    if (audio.isPlaying()) {
      audio.pause();
      setPlaying(false);
    } else {
      setPlaying(true);
      audio.play(success => {
        if (success) {
          setPlaying(false);
          console.log('successfully finished playing');
        } else {
          setPlaying(false);
          console.log('playback failed due to audio decoding errors');
        }
      });
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.playBtn} onPress={playPause}>
        <Image source={playing ? Pause : Play} style={styles.Image} />
        <MaterialCommunityIcons name="home" color={'#fff'} size={30} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  playBtn: {
    padding: 20,
  },
  Image: {
    width: 100,
    height: 100,
  },
});
export default App;
