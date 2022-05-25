import $ from 'jquery';
import jwt_decode from 'jwt-decode';

const UserModule = {
  state: {
      id: "",
      username: "",
      photo: "",
      followerCount: 0,
      access: "",
      refresh: "",
      is_login: false,
  },
  getters: {
  },
  mutations: {
      // 在mutations里更新state的状态 在actions里调用
      updateUserInfo(state, userInfo) {
        state.id = userInfo.id;
        state.username = userInfo.username;
        state.photo = userInfo.photo;
        state.followerCount = userInfo.followerCount;
        state.access = userInfo.access;
        state.refresh = userInfo.refresh;
        state.is_login = userInfo.is_login;
      },

      // 刷新jwt
      updateAccess(state, access) {
          state.access = access;
      },

      // 退出登录
      logout(state) {
          state.id = "";
          state.username = "";
          state.photo = "";
          state.followerCount = "";
          state.access = "";
          state.refresh = "";
          state.is_login = false;
      },
  },
  actions: {
      login(context, userInfo) {
        //  获取Json Web Token（JWT）
        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/api/token/",
            type: "POST",
            data: {
                username: userInfo.userName,
                password: userInfo.passWord,
            },
            
            // 成功请求api后 获取用户信息
            success(resp) {

                // 每隔5分钟刷新一次jwt验证
                setInterval(() => {
                    $.ajax({
                        url: 'https://app165.acapp.acwing.com.cn/api/token/refresh/',
                        type: 'post',
                        data: {
                            refresh,
                        },
                        success(resp) {
                            context.commit("updateAccess", resp.access);
                        }
                    });
                }, 4.5 * 1000 * 60);
                const {access, refresh} = resp;
                // 使用jwt-decode解码 得到userId
                const accessObj = jwt_decode(access);
                // ajax请求用户信息
                $.ajax({
                    url: 'https://app165.acapp.acwing.com.cn/myspace/getinfo/',
                    type: 'get',
                    data: {
                        user_id: accessObj.user_id,
                    },
                    // 加jwt授权
                    headers: {
                        'Authorization': "Bearer " + access,
                    },
                    // 请求成功后解构 通过context.commit(funcname, params)调用mutations中的updateUserInfo更新用户信息
                    success(resp) {
                        context.commit("updateUserInfo", {
                            ...resp,
                            access: access,
                            refresh: refresh,
                            is_login: true,
                        });
                        // 调用LoginView的成功回调函数
                        userInfo.success();
                    }
                });
            },
            error() {
                userInfo.error();
            }
        });
      }
  },
  modules: {
  }
};

export default UserModule;
