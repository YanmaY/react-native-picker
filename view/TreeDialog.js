import React, { Component } from 'react';

import { View, Text, Animated, TouchableOpacity, Image } from 'react-native';

import BaseDialog from './BaseDialog';
import TreeSelect from 'react-native-tree-select'

class TreeDialog extends BaseDialog {
  static defaultProps = {
    items: [],
    selectedValue: '',
    confirmText: '确定',
    confirmTextSize: 14,
    confirmTextColor: '#333333',
    cancelText: '取消',
    cancelTextSize: 14,
    cancelTextColor: '#333333',
    itemHeight: 40,
    onPickerCancel: null,
    onPickerConfirm: null,
    renderPicker: null
  };
  selectedItem = null;

  constructor(props) {
    super(props);
  }

  _getContentPosition() {
    return { justifyContent: 'flex-end', alignItems: 'center' };
  }

  renderPicker(){
    return (
      <TreeSelect
        data={this.props.items}
        defaultSelectedId={this.props.selectedValue}
        itemStyle={{ fontSize: 14, color: '#666' }}
        selectedItemStyle={{
          backgroudColor: '#FFF',
          fontSize: 14,
          color: '#F00'
        }}
        onClickLeaf={({ item }) => this.selectedItem = item}
        leafCanBeSelected={true} // 指定只能够选择叶子节点
        treeNodeStyle={{
          openIcon: <Image source={require('./../img/angle-down.png')} style={{width:12}} resizeMode="contain"/>,
          closeIcon: <Image source={require('./../img/angle-right.png')} style={{width:12}} resizeMode="contain"/>
        }}
      />
    );
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
                  this.props.onPickerConfirm(this.selectedItem);
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

export default TreeDialog;
