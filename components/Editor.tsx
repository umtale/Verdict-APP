import React from 'react';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Platform,
  Text,
} from 'react-native';
import {
  RichEditor,
  RichToolbar,
  actions,
} from 'react-native-pell-rich-editor';

export default function Editor() {
  const richText = React.useRef<RichEditor>(null);
  const scrollRef = React.useRef<ScrollView>(null);
  // const richtext = useRef('<b>Hello <i>World</i></b>');
  // const [state, setState] = useState({ html: '<b>Hello <i>World</i></b>' });

  // const handleChange = (evt: any) => {
  //   text.current = evt.target.value;
  // };

  // const handleBlur = () => {
  //   console.log(text.current);
  // };

  const onPressAddImage = () => {
    let options: ImageLibraryOptions = {
      mediaType: 'photo',
    };

    launchImageLibrary(options).then(result => {
      if (result.assets) {
        result.assets.forEach(asset => {
          richText.current?.insertImage(
            'https://cdn.verdict.org/uploads/2021/11/396cf2cf3dff4ab7447998e438485c65.jpg?format=webp%2Cjpg&w=1626',
            'background: gray;',
          );
        });
      }
    });
  };

  return (
    // <View>
    <>
      <ScrollView
        style={[styles.scroll]}
        keyboardDismissMode={'none'}
        ref={scrollRef}
        nestedScrollEnabled={true}
        scrollEventThrottle={20}>
        <RichToolbar
          style={[styles.richBar]}
          flatContainerStyle={styles.flatStyle}
          editor={richText}
          // disabled={disabled}
          selectedIconTint={'#ff4242'}
          disabledIconTint={'#bfbfbf'}
          actions={[
            actions.keyboard,
            actions.insertImage,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.blockquote,
            actions.heading2,
            actions.heading3,
          ]}
          iconMap={{
            [actions.paragraph]: ({ tintColor }) => (
              <Text style={[styles.tib, { color: tintColor }]}>P</Text>
            ),
            [actions.heading2]: ({ tintColor }) => (
              <Text style={[styles.tib, { color: tintColor }]}>H2</Text>
            ),
            [actions.heading3]: ({ tintColor }) => (
              <Text style={[styles.tib, { color: tintColor }]}>H3</Text>
            ),
            [actions.heading4]: ({ tintColor }) => (
              <Text style={[styles.tib, { color: tintColor }]}>H4</Text>
            ),
          }}
          onPressAddImage={onPressAddImage}
          // onInsertLink={that.onInsertLink}
        />
        <View style={[styles.topVi]}>
          <RichEditor
            ref={richText}
            style={styles.rich}
            useContainer={true}
            initialContentHTML={
              'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'
            }
            // editorInitializedCallback={() => this.onEditorInitialized()}
          />
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <RichToolbar
          style={[styles.richBar]}
          flatContainerStyle={styles.flatStyle}
          editor={richText}
          selectedIconTint={'#2095F2'}
          disabledIconTint={'#bfbfbf'}
          onPressAddImage={onPressAddImage}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.alignLeft,
            actions.alignCenter,
            actions.alignRight,
          ]}
        />
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  scroll: {
    backgroundColor: '#ffffff',
    // maxHeight: '80%',
  },
  topVi: {
    backgroundColor: '#fafafa',
  },
  rich: {
    minHeight: 300,
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e3e3e3',
  },
  richBar: {
    alignItems: 'flex-start',
    borderColor: '#efefef',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  button: {
    backgroundColor: '#ff4242',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  text: {
    color: '#fff',
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: 18,
  },
  tib: {
    textAlign: 'center',
    color: '#515156',
  },
  flatStyle: {
    paddingHorizontal: 12,
  },
});
