import React, { Component } from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Keyboard
} from 'react-native';

import BaseDialog from './BaseDialog';

import KeyboardSpacer from './KeyboardSpacer';

class InputDialog extends BaseDialog {
  static defaultProps = {
    removeSubviews: false,
    title: '',
    titleSize: 16,
    titleColor: '#333333',
    cancelText: '返回',
    cancelSize: 14,
    cancelColor: '#333333',
    btnText: '确认',
    btnTextSize: 12,
    btnTextColor: '#ffffff',
    btnBgColor: '#1097D5',
    placeholder: '',
    onSubmit: null,
    onCancel: null,
    modal: true,
    numberOfLines: 1
  };

  constructor(props) {
    super(props);
  }

  _getContentPosition() {
    return { justifyContent: 'flex-end', alignItems: 'center' };
  }

  show() {
    super.show();
  }

  dismiss() {
    super.close();
  }

  renderContent() {
    return (
      <View
        style={{
          width: this.mScreenWidth,
          backgroundColor: '#f8f8f8',
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5
        }}
      >
        <ScrollView keyboardShouldPersistTaps="always">
          <View
            style={{
              width: this.mScreenWidth,
              height: this.getSize(50),
              flexDirection: 'row',
              paddingLeft: this.getSize(10),
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomColor: '#F4F4F4',
              borderBottomWidth: 1,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5
            }}
          >
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                this.dismiss(() => {
                  this.props.onCancel && this.props.onCancel();
                });
              }}
              style={{
                position: 'absolute',
                left: this.getSize(10),
                height: this.getSize(40),
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: this.getSize(5)
              }}
            >
              <Text
                style={{
                  fontSize: this.props.cancelSize,
                  color: this.props.cancelColor,
                  marginLeft: this.getSize(5)
                }}
              >
                {this.props.cancelText}
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                position: 'absolute',
                fontSize: this.props.titleSize,
                color: this.props.titleColor,
                fontWeight: '600'
              }}
            >
              {this.props.title}
            </Text>
          </View>
          <TextInput
            autoFocus={true}
            ref={ref => (this.textInput = ref)}
            style={{
              width: this.getSize(345),
              marginLeft: this.getSize(15),
              height:
                this.props.numberOfLines > 1
                  ? this.getSize(100)
                  : this.getSize(40),
              color: '#333333',
              fontSize: this.getSize(14),
              borderWidth: 1,
              borderColor: '#E8EEF0',
              backgroundColor: '#ffffff',
              borderRadius: this.getSize(4),
              paddingLeft: this.getSize(15),
              paddingRight: this.getSize(15),
              paddingTop: this.getSize(10)
            }}
            numberOfLines={this.props.numberOfLines}
            multiline={this.props.numberOfLines > 1}
            value={this.state.text}
            underlineColorAndroid={'transparent'}
            placeholder={this.props.placeholder}
            placeholderTextColor="#999999"
            onChangeText={text => {
              this.inputText = text;
            }}
          />
          <View
            style={{
              width: this.mScreenWidth,
              height: this.getSize(48),
              paddingRight: this.getSize(15),
              justifyContent: 'center',
              alignItems: 'flex-end'
            }}
          >
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                this.dismiss(() => {
                  this.props.onSubmit && this.props.onSubmit(this.inputText);
                });
              }}
              style={{
                width: this.getSize(60),
                height: this.getSize(28),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: this.props.btnBgColor,
                borderRadius: this.getSize(4)
              }}
            >
              <Text
                style={{
                  fontSize: this.props.btnTextSize,
                  color: this.props.btnTextColor
                }}
              >
                {this.props.btnText}
              </Text>
            </TouchableOpacity>
          </View>
          {this.props.modal ? null : <KeyboardSpacer />}
        </ScrollView>
      </View>
    );
  }
}

export default InputDialog;
