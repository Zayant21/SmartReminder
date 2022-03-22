/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';

import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import axios from 'axios';
const baseUrl = 'http://10.0.2.2:6060';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const Item = ({ name }) => (
  <View style={styles.item}>
    <Text style={styles.name}>{name}</Text>
  </View>
);

const App: () => Node = () => {
  const renderItem = ({ item }) => (
    <Item name={item.name} />
  );

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [inputText, setText] = useState('');

  var [kittyData, setKittyData] = useState([]);
  
  ;

  const addAPostButtonFunction = () => {
    axios.post(`${baseUrl}/posts`, {name: inputText})
    .then(function (response) {
      alert(JSON.stringify(response.data));
    })
    .catch(function (error) {
      alert(error.message);
    })
    .finally(function () {
    });
  };
  
  const fetchPostsButtonFunction = () => {
    axios.get(`${baseUrl}/posts`)
    .then(function (response) {
      var kitty_data = []
      for (let i = 0; i < response.data.message.length; i++) {
        kitty_data.push(response.data.message[i])
      }
      setKittyData(kitty_data);
    })
    .catch(function (error) {
      alert(error.message);
    })
    .finally(function () {
      // always executed
    });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="API Test">
          </Section>
            <TextInput
              style={{height: 40}}
              placeholder="Please enter a name here."
              onChangeText={newText => setText(newText)}
              defaultValue={inputText}
              />
            <Button
              onPress={addAPostButtonFunction}
              title="Add an entry to the database!"
              color="#841584"
              accessibilityLabel="Add a post to the database with this purple button"
              />
            <Button
              onPress={fetchPostsButtonFunction}
              title="Fetch entries from MongoDB!"
              color="#841584"
              accessibilityLabel="Fetch posts from MongoDB with this purple button"
              />
            <FlatList
              data={kittyData}
              renderItem={renderItem}
              keyExtractor={item => item._id}
              extraData={kittyData}
            />
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 4,
    marginVertical: 4,
    marginHorizontal: 16,
  },
  name: {
    fontSize: 14,
  },
  sectionContainer: {
    marginTop: 12,
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
