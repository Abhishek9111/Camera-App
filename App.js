import React,{useState} from 'react';
import {
  Image,
  TouchableOpacity,
  Button,  
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { RNCamera } from 'react-native-camera';

const PendingView =()=> (         //using () cause we have to return something if we use {} 
   <View
   style={{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
   }} 
   >
  <Text style={{fontSize:30,color:'red'}}>Loading...</Text>
   </View>
)
const App=()=>{

  const[image, setImage] = useState(null)


  const takePicture = async(camera)=>{          //method for camera
    try{
      const options = {quality: 0.9, base64: false}
      const data = await camera.takePictureAsync(options)
      setImage(data.uri)
    }catch(error){
      console.warn(error)
    }
  }

  return(
    <>
    <View style={styles.container}>
      { image ? (
        <View style={styles.preview}>
        <Text style={styles.camText}>
          Here is your new Profile Picture
        </Text>
        <Image style={styles.clicked} source={{uri: image, width:'100%',height:'80%'}}/>
        <Button
        title="Click New Image"
        onPress={()=>{
          setImage(null) //will reset the state and we will be back to snap screen
        }}
        >
        </Button>
        </View>
      ) : (
        <RNCamera
        style={styles.preview}
        type = {RNCamera.Constants.Type.back}   //camera type browse in it
        captureAudio = {false}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title:"Permission to use Camera",
          message: "longer text to use camera",
          buttonPositive: "ALLOW",
          buttonNegative: "CANCEL"
        }}
        androidRecordAudioPermissionOptions ={{
          title:"Permission to capture audio",
          message: "longer text to capture audio",
          buttonPositive: "ALLOW",
          buttonNegative: "CANCEL"
        }}
        >
        {({camera, status})=>{
          if(status != 'READY') return <PendingView/>     //view created above the App
          return(
            <View
            style={{
              flex:0,
              flexDirection: 'row',
              justifyContent: 'center'
            }}
            >
              <TouchableOpacity
              style = {styles.capture}
              onPress={()=> takePicture(camera)}
              >
                <Text>SNAP</Text>
              </TouchableOpacity>
            </View>
          )
        }}
        </RNCamera>
      )}
    </View>

    </>
  )
}


export default App;


const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    backgroundColor: '#0A79DF'
  },
  preview: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  capture: {
    flex:0,
    backgroundColor: 'orange ',
    padding: 20,
    alignSelf: "center"
  },
  camText: {
    backgroundColor: '#3498DB',
    color: '#FFFFFF',
    marginBottom: 10,
    width: "100%",
    textAlign: 'center',
    paddingVertical:20,
    fontSize: 25
  },
  clicked:{
    width: 300,
    hieght: 300,
    borderRadius: 150
  }
})