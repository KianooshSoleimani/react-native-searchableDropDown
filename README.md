# React Native Searchable DropDown

a list of item with flatlist you can search on it and use one of them like dropdown

## Features

- simple flatlist dropdown searchable

![alt img](test.gif | width=100)

## Installation


```sh
$ npm install react-native-dropdown-searchable --save
```

## Quick Start

```js
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import SearchableDropDown from 'react-native-dropdown-searchable';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          tagId: 1,
          title: 'first item',
        },
        {
          tagId: 2,
          title: 'second item',
        }
      ],
      tagItem: {
        tagId: 1,
        title: 'nothing'
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchableDropDown
          onTextChange={tag => {
            this.setState({ tag });
          }}
          onItemSelect={item => {
            this.setState({ tagItem: item });
          }}
          items={this.state.list}
          defaultIndex={0}
          resetValue={false}
          placeholder={'type something...'}
          placeholderTextColor={'black'}
          underlineColorAndroid="transparent"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
});

```
## Authors

* **Kianoosh Soleimani** -(https://github.com/KianooshSoleimani)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
