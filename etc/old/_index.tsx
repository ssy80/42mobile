import { Text, View, StyleSheet } from "react-native";
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/*<Image source={PlaceholderImage} style={styles.image} />*/}
        <ImageViewer imgSource={PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button label="Choose a photo" />
        <Button label="Use this photo" />
      </View>

      {/*<Text>Edit app/index.tsx to edit this screen.</Text>
      <Text style={styles.text}>Home screen</Text>
      <Link href="/about" style={styles.button}>
      Go to About screen
      </Link>*/}
      {/*<Link href="/not_found" style={styles.button}>
      go not found screen
      </Link>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },
  /*image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },*/
  /*text: {
    color: '#ffffff',
  },*/
  /*button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },*/
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
