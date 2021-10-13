# Insta Clone

-React Native && Expo

# ToDo

[] Make Error components
[] Prop Types

# 1

# https://reactnative.directory/?search=storage

- App Loading : expo install expo-app-loading
- Font : expo install expo-font
- preload assets : Need to be ready before user look insdie
- preload return Promise array
- local image
- React Navigatior (Can make stack screen)
  cf) Stack "It's not going away it just went down new screen goes on top"
  secondScreen - Like this
  firstScreeen -
  cf) https://reactnavigation.org/docs/navigating

# 2

- Props theme, AppearanceProvider
- Style Component doesn't work each component so you need to do set each variables each component!

# 3

- when you press next move to next input (https://docs.expo.dev/versions/latest/react-native/textinput/#props) "Text Input things"
- How to move your screen depends on keyboard ? KeyboardAvoidingView(https://docs.expo.dev/versions/latest/react-native/keyboardavoidingview/#contentcontainerstyle)
  -remove keyboard if user touch empty screen => touchableOpacity without Feedback

# 4

- React hook form can use on Native, how to transfer data ? using navigation.navigate props

# 5

- what is diffierent expo i and npm i ? expo i called npm i
- it maek sure this pacage work on current expo version

# 6

- ScrollView vs FlatList it depends on amount of data
- Photo Components ,How to dissapear the scroll var

# 7

- Infinity Scroll,

1. need to set a offset on your query
2. onEndReachedThreshold : set the end point by number start 0 to etc..
3. onEndReached : when i reached bottom start a fucntion
4. Set apollo : How to handle those refetching data ?

- typePolicies, query or etc..
- keyargs: false ? => we want apollo does not care the args
  #4-1
  -merge those data
  ex)merge(exsiting=[],incoming=[]) => return (...exsiting,...incoming)
- offSetLimitPagination or cna use this function
- Pull Refreshing

- refreshing, onRefresh use those options on FlatScreen

# 8

- How to run without wifi cache persist

# 9

- Make a Fragment , using navigate params (https://reactnavigation.org/docs/route-prop/)
  -Flatlist etc..
  -Seperator

# 10

- Search input, react hooks useForm , lazyquery

# Need to refectoring on Profile sections

# Notification

# fix the camera interface
