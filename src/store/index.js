import Vue from 'vue'
import Vuex from 'vuex'
import {getRequest} from "../utils/api";
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

Vue.use(Vuex);

// const now = new Date();

const store = new Vuex.Store({
    state: {
        routes: [],
        admins:[],
        currentAdmin:JSON.parse(window.sessionStorage.getItem('user')),
        sessions: {},
        currentSession: null,
        filterKey: '',
        stomp:null
    },
    mutations: {
        initRoutes(state, data) {
            state.routes = data;
        },
        changeCurrentSession(state, currentSession) {
            state.currentSession = currentSession;
        },
        addMessage(state, msg) {
            // alert(JSON.stringify(msg));
            let mss=state.sessions[state.currentSession.username+'#'+msg.to];
            if(!mss){
                state.sessions[state.currentSession.username+'#'+msg.to]=[];
                // Vue.set(state.sessions,state.currentSession.username+'#'+msg.to,[]);
            }
            state.sessions[state.currentSession.username+'#'+msg.to].push({
                content: msg.content,
                date: new Date(),
                self: !msg.notSelf
            })
        },
        // INIT_DATA(state) {
        //     //浏览器本地聊天记录
        //     // let data = localStorage.getItem('vue-chat-session');
        //     // //console.log(data)
        //     // if (data) {
        //     //     state.sessions = JSON.parse(data);
        //     // }
        // },
        INIT_ADMINS(state,data){
            state.admins= data;
        }
    },
    actions: {
        connect(context){
            context.state.stomp=Stomp.over(new SockJS('/ws/ep'));
            let token=window.sessionStorage.getItem('tokenStr')
            // eslint-disable-next-line no-unused-vars
            context.state.stomp.connect({'Auth-Token':token},success =>{
                context.state.stomp.subscribe('/user/queue/chat',msg=>{
                    let receiveMsg=JSON.parse(msg.body);
                    receiveMsg.notSelf=true;
                    receiveMsg.to=receiveMsg.from;
                    context.commit('addMessage',receiveMsg);
                    console.log(msg.body)
                })
                // eslint-disable-next-line no-unused-vars
            },error=>{
                console.log('失败')
            })

        },
        initData(context) {
            getRequest('/chat/admin').then(resp=>{
                if(resp){
                    // alert(JSON.stringify(resp));
                    context.commit('INIT_ADMINS',resp)
                }
            })
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
