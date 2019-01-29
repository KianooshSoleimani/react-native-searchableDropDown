import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, ViewPropTypes } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import normalize from '../utility/NormalizedText';
import { hp, wp } from '../utility/ResponsiveScreen';
import Utils from '../utility/Utils';

function styleByListSize(list) {
    const length = list.length;
    const height = hp('8.5%');
    const style = {
        maxHeight: hp('0%'),
        borderWidth: 1
    };
    if (length < 6) {
        style.maxHeight = length * height;
    } else {
        style.maxHeight = hp('50%');
    }
    if (length === 0) {
        style.borderWidth = 0;
    }
    return style;
}

export default class SearchableDropDown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: {},
            listItems: [],
            focus: false,
        };
    }

    componentDidMount() {
        const listItems = this.props.items;
        const defaultIndex = this.props.defaultIndex;
        if (defaultIndex && listItems.length > defaultIndex) {
            this.setState({
                listItems,
                item: listItems[defaultIndex]
            });
        }
        else {
            this.setState({ listItems });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return Utils.shallowCompare(this, nextProps, nextState);
    }

    searchedItems = (searchedText) => {
        const ac = this.props.items.filter((item) => {
            return item.title.indexOf(searchedText) > -1;
        });
        const item = {
            title: searchedText
        };
        this.setState({ listItems: ac, item });
        const onTextChange = this.props.onTextChange;
        if (onTextChange && typeof onTextChange === 'function') {
            setTimeout(() => {
                onTextChange(searchedText);
            }, 0);
        }
    };

    renderItems(item) {
        return (
            <TouchableOpacity
                style={searchableDropDownStyle.itemContainer}
                onPress={() => {
                    this.setState({ item, focus: false }, () => {
                        this.props.onItemSelect(item);
                    });
                    Keyboard.dismiss();
                }}
            >
                <Text style={searchableDropDownStyle.itemText}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        );
    }

    renderFlatList() {
        if (this.state.focus) {
            return (
                <FlatList
                    keyboardShouldPersistTaps="always"
                    data={this.state.listItems}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => this.renderItems(item)}
                    style={[searchableDropDownStyle.listContainer, styleByListSize(this.state.listItems)]}
                />
            );
        }
    }

    render() {
        return (
            <View style={searchableDropDownStyle.container}>
                <TextInput
                    underlineColorAndroid={this.props.underlineColorAndroid}
                    maxLength={30}
                    onFocus={() =>
                        this.setState({ focus: true })
                    }
                    onBlur={() =>
                        this.setState({ focus: false })
                    }
                    ref={(e) => { this.input = e; }}
                    onChangeText={(text) =>
                        this.searchedItems(text)
                    }
                    value={this.state.item.title}
                    style={searchableDropDownStyle.input}
                    placeholderTextColor={this.props.placeholderTextColor}
                    placeholder={this.props.placeholder}
                />
                {this.renderFlatList()}
            </View>
        );
    }

}

const searchableDropDownStyle = EStyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    listContainer: {
        backgroundColor: 'transparent',
        width: wp('80%'),
        borderColor: 'gray',
        borderRadius: 5,
    },
    itemContainer: {
        height: hp('7%'),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        alignSelf: 'center',
        margin: 5,
        zIndex: 0,
    },
    itemText: {
        fontSize: normalize(14),
        '@media ios': {
            fontFamily: '$IR',
            fontWeight: '300',
        },
        '@media android': {
            fontFamily: '$IR_L',
        },
        color: 'black',
        textAlign: 'right',
        padding: 5,
    },
    input: {
        height: hp('6%'),
        width: wp('80%'),
        alignSelf: 'center',
        borderColor: 'black',
        borderWidth: 0.6,
        borderRadius: 5,
        '@media ios': {
            fontFamily: '$IR',
            fontWeight: '300',
        },
        '@media android': {
            fontFamily: '$IR_L',
        },
        fontSize: normalize(14),
        color: 'black',
        textAlign: 'right',
    }
});

SearchableDropDown.defaultProps = {
    items: [],
    defaultIndex: -1,
    onTextChange: () => {},
    onItemSelect: () => {},
    containerStyle: {},
    textInputStyle: {},
    itemStyle: {},
    itemTextStyle: {},
    resetValue: true,
    placeholder: 'لطفا متنی وارد کنید...',
    placeholderTextColor: 'black',
    itemsContainerStyle: {},
    underlineColorAndroid: 'transparent',
};

SearchableDropDown.propTypes = {
    items: PropTypes.object,
    defaultIndex: PropTypes.number,
    onTextChange: PropTypes.func,
    onItemSelect: PropTypes.func,
    containerStyle: ViewPropTypes.style,
    textInputStyle: ViewPropTypes.style,
    itemStyle: ViewPropTypes.style,
    itemTextStyle: ViewPropTypes.style,
    resetValue: PropTypes.bool,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    itemsContainerStyle: ViewPropTypes.style,
    underlineColorAndroid: PropTypes.string,
};
