import React from 'react'
import { View,FlatList,Dimensions,
    ScrollView,
    TouchableOpacity,
    Text, 
    TextInput,
     StyleSheet, 
     Image,
      Alert ,
      RefreshControl,
      ActivityIndicator,} from 'react-native'
import req from '../request/req'
import {EasyLoading, Loading} from '../componment/EasyLoading'
const CITY_NAMES = ["北京", "上海", "广州", "深圳", "成都", "武汉", "南京"];
class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shopList: [],
            isLoading:false
        }
    }
    componentDidMount() {
        this.getShopList();
    }
    handleSerach = (val) => {
        this.setState({
            searchCode: val
        })
    }
    searchHandler = () => {
        Alert.alert(this.state.searchCode);
    }
    //获取数据
    getShopList = () => {
        req.get('http://data.zuidaku.com/Uniapp.uniapp/getGoodList', { 'page': 2 }).then(res => {
            console.log(res.data);
            this.setState({
                shopList: res.data
            })
        })
    }
    render() {
        return (
            <View  style={styles.container}>
                <View style={styles.imgBox}>
                    <Image style={{ height: 200, width: '100%' }} source={require('../assets/img/banner.jpg')}></Image>
                </View>
                <TextInput
                    style={styles.searchInput}
                    placeholder="搜索内容"
                    //下划线透明
                    underlineColorAndroid='transparent'
                    //字母大写
                    autoCapitalize='none'
                    //  键盘上的返回键类型，可选的值有 "done","go","next","search","send"
                    returnKeyType="search"
                    maxLength={20}
                    onSubmitEditing={this.searchHandler}
                    onChangeText={this.handleSerach}
                ></TextInput>
                <View >
                    <FlatList
                       
                        data={this.state.shopList}
                        renderItem={this.renderItem.bind(this)}
                        keyExtractor={(item,index) =>index.toString()}
                        ListEmptyComponent={this.LoadComponent}
                        numColumns ={2}
                        //下拉刷新
                        refreshing={this.state.isLoading}
                        onRefresh={()=>{console.log('refresh')}}
                        //设置上拉加载更多
                        ListFooterComponent={() => this.renderLoadMoreView()}
                        onEndReached={() => this.loadMoreData()}
                    />
                </View>
            </View> 
        );
    }
    renderItem=({ item })=>{
        return(
            <TouchableOpacity onPress={this.selectItem.bind(this,item)} style={{width:'45%',marginLeft:'3.5%',marginTop:10}}>
                 <Image style={{ margin:10,height: 100 }} source={{uri:item.goods_img}}></Image>
                 <View style={{padding:5}}>
                 <Text ellipsizeMode={'tail'} numberOfLines={2} style={styles.name}>{item.goods_name}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    loadDate=()=>{
        console.log('refresh');
        this.setState({
            isLoading:true
        })
    }
    _footer = () => {
        return <Text style={[styles.txt,{backgroundColor:'black'}]}>这是尾部</Text>;
    }
    LoadComponent=()=>{
        return(
            <Loading color={'red'} loadingStyle={{backgroundColor: 'lightgreen'}} textStyle={{color: 'red', fontSize: 18}}/>
        );
    }
      //上拉加载布局
      renderLoadMoreView=()=> {
        return (
            <View style={styles.loadMore}>
                <ActivityIndicator
                    style={styles.indicator}
                    size={"large"}
                    color={"red"}
                    animating={true}
                />
                <Text>正在加载更多</Text>
            </View>
        )
    }
    loadMoreData=()=>{
        console.log('loadMore')
    }
    selectItem(item){
        console.log(item)
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEE',
        position: 'relative',
        marginBottom:200
    },
    imgBox: {
        width: '100%',
        height:200
    },
    name:{
        fontSize:15,
        color:'#000'
    },
    searchInput: {
        position: 'absolute',
        top: 100,
        left: 40,
        right: 40,
        paddingLeft: 20,
        backgroundColor: '#FFF',
        borderRadius: 10
    },
    list:{
        // flex:1,
    }
})
export default HomePage;