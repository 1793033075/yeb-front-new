import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const now = new Date();

const store = new Vuex.Store({
    state: {
        routes: [],
        sessions: [{
            id: 1,
            user: {
                name: '示例介绍1',
                img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F22%2F20210622140718_0b391.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1678332058&t=00f102b5d5696341611ec2a65639fe9e'
            },
            messages: [{
                content: 'Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。',
                date: now
            }, {
                content: '项目地址(原作者): https://github.com/coffcer/vue-chat',
                date: now
            }, {
                content: '本项目地址(重构): https://github.com/is-liyiwei',
                date: now
            }]
        }, {
            id: 2,
            user: {
                name: 'webpack2',
                img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F22%2F20210622140718_0b391.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1678332058&t=00f102b5d5696341611ec2a65639fe9e'
            },
            messages: [{
                content: 'Hi，我是webpack哦',
                date: now
            }]
        }],
        currentSessionId: 1,
        filterKey: ''
    },
    mutations: {
        initRoutes(state, data) {
            state.routes = data;
        },
        changeCurrentSessionId(state, id) {
            state.currentSessionId = id;
        },
        addMessage(state, msg) {
            state.sessions[state.currentSessionId - 1].messages.push({
                content: msg,
                date: new Date(),
                self: true
            })
        },
        INIT_DATA(state) {
            let data = localStorage.getItem('vue-chat-session');
            //console.log(data)
            if (data) {
                state.sessions = JSON.parse(data);
            }
        }
    },
    actions: {
        initData(context) {
            context.commit('INIT_DATA')
        }
    },

    modules: {}
});

store.watch(function (state) {
    return state.sessions
}, function (val) {
    console.log('CHANGE: ', val);
    localStorage.setItem('vue-chat-session', JSON.stringify(val));
}, {
    deep: true/*这个貌似是开启watch监测的判断,官方说明也比较模糊*/
});

export default store;
