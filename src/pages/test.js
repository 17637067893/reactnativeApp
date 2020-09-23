import React, {Component} from 'react';
import {StyleSheet, FlatList, Text, View, RefreshControl, ActivityIndicator} from "react-native";

const CITY_NAMES = ["北京", "上海", "广州", "深圳", "成都", "武汉", "南京"];

export default class TestPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false, //默认没有下拉刷新
            dataArray: CITY_NAMES //默认数据
        }
    }
    componentDidMount(){
        // console.log('test')
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataArray}
                    renderItem={(data) => <View style={{backgroundColor:'green',width:100,height:100}}></View>}
                    refreshing={false}
                    onRefresh={()=>{
                        console.log('refresh')
                    }}
                    //设置上拉加载
                    ListFooterComponent={() => this.renderLoadMoreView()}
                    onEndReached={() => this.loadMoreData()}
                />
            </View>

        );
    }

    //条目布局
    renderItemView(data) {
        return <View style={styles.item}>
            <Text style={styles.text}>{data}</Text>
        </View>
    }

    //下拉刷新数据
    loadData() {
    //   console.log(66);
        this.setState({
            isLoading: true
        })

        //模拟网络请求
        this.timeId = setTimeout(() => {
            //把数据反转
            let newArray = [];
            for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
                newArray.push(this.state.dataArray[i]);
            }
            this.setState({
                isLoading: false,
                dataArray: newArray
            })

        }, 3000);
    }
    componentWillUnmount(){
      clearTimeout(this.timeId)
    }
    //上拉加载布局
    renderLoadMoreView() {
        return <View style={styles.loadMore}>
            <ActivityIndicator
                style={styles.indicator}
                size={"large"}
                color={"red"}
                animating={true}
            />
            <Text>正在加载更多</Text>
        </View>
    }

    //上拉加载更多数据
    loadMoreData() {
        //模拟网络请求
        console.log(77);
        setTimeout(() => {
            let newArray = [];
            for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
                newArray = this.state.dataArray.concat(CITY_NAMES)
            }
            this.setState({
                dataArray: newArray
            })

        }, 3000);
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    item: {
        backgroundColor: "#169",
        height: 200,
        margin: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "red",
        fontSize: 20,
    },

    loadMore: {
        alignItems: "center"
    },
    indicator: {
        color: "red",
        margin: 10
    }
});

