import React, { Component } from 'react';

import { View, Text, Animated, TouchableOpacity, FlatList } from 'react-native';

import BaseDialog from './BaseDialog';
import PickerView from './PickerView';

class SimpleItemsDialog extends BaseDialog {
  static defaultProps = {
    items: ['a', 'b', 'c'],
    selectedValue: 'a',
    confirmText: '确定',
    confirmTextSize: 14,
    confirmTextColor: '#333333',
    cancelText: '取消',
    cancelTextSize: 14,
    cancelTextColor: '#333333',
    itemTextColor: 0x333333ff,
    itemSelectedColor: 0x1097d5ff,
    itemHeight: 40,
    onPickerCancel: null,
    onPickerConfirm: null
  };
  selectedValue = null;

  constructor(props) {
    super(props);
  }

  _getContentPosition() {
    return { justifyContent: 'flex-end', alignItems: 'center' };
  }

  renderPicker() {
    let selectedIndex = 0;
    let length = this.props.items.length;
    let items = [];
    let isObject = false;
    let selected = false;

    if (typeof this.props.items[0] === 'object') {
      isObject = true;
      items.length = 0;
    } else items = this.props.items;

    for (let i = 0; i < length; i++) {
      if (isObject) items.push(this.props.items[i].name);

      if (
        !selected &&
        (this.props.items[i] === this.props.selectedValue ||
          this.props.items[i].id === this.props.selectedValue)
      ) {
        selected = true;
        selectedIndex = i;
        this.selectedValue = this.props.items[i];
      }
    }

    if (this.props.items && length > 0) {
      return (
        <PickerView
          itemTextColor={this.props.itemTextColor}
          itemSelectedColor={this.props.itemSelectedColor}
          list={items}
          onPickerSelected={toValue => {
            if (isObject)
              this.selectedValue = this.props.items.find(
                x => x.name === toValue
              );
            else this.selectedValue = toValue;
          }}
          selectedIndex={selectedIndex}
          fontSize={this.getSize(14)}
          itemWidth={this.mScreenWidth}
          itemHeight={this.props.itemHeight}
        />
      );
    } else {
      return null;
    }
  }

  renderContent() {
    return (
      <View
        style={{
          height:
            this.props.itemHeight * 5 + this.getSize(15) + this.getSize(44),
          width: this.mScreenWidth
        }}
      >
        <View
          style={{
            width: this.mScreenWidth,
            height: this.props.itemHeight * 5 + this.getSize(15),
            flexDirection: 'row',
            position: 'absolute',
            bottom: 0
          }}
        >
          {this.renderPicker()}
        </View>
        <View
          style={{
            width: this.mScreenWidth,
            height: this.getSize(44),
            backgroundColor: '#ffffff',
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            top: 0,
            borderBottomColor: '#F4F4F4',
            borderBottomWidth: 1,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.dismiss(() => {
                this.props.onPickerCancel && this.props.onPickerCancel();
              });
            }}
            style={{
              width: this.getSize(60),
              height: this.getSize(44),
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                fontSize: this.props.cancelTextSize,
                fontWeight: '400',
                color: this.props.cancelTextColor
              }}
            >
              {this.props.cancelText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.dismiss(() => {
                this.props.onPickerConfirm &&
                  this.props.onPickerConfirm(this.selectedValue);
              });
            }}
            style={{
              width: this.getSize(60),
              height: this.getSize(44),
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                fontSize: this.props.confirmTextSize,
                fontWeight: '400',
                color: this.props.confirmTextColor
              }}
            >
              {this.props.confirmText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default SimpleItemsDialog;
