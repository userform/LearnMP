App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    var that = this;

    console.log('初始化完成')

    wx.getUserInfo({
      complete:function(res) {
        console.log(res)
        console.log('--------------')
      },
      fail: function () {
        wx.showModal({
          title: '用户未授权',
          content: '如需正常使用该小程序功能，请按确定并在授权管理中选中“用户信息”，然后点按确定。最后再重新进入小程序即可正常使用。',
          showCancel: false,
          success: function (resbtn) {
            if (resbtn.confirm) {
              wx.openSetting({
                success: function success(resopen) {
                  //  获取用户数据
                  that.checkSettingStatu();
                  console.log(that)
                }
              });
            }
          }
        })
      }
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },

  checkSettingStatu: function (cb) {
    var that = this;
    // 判断是否是第一次授权，非第一次授权且授权失败则进行提醒
    wx.getSetting({
      success: function success(res) {
        var authSetting = res.authSetting;
        if (isEmptyObject(authSetting)) {
               //第一次
        } else {
          // 没有授权的提醒
          if (authSetting['scope.userInfo'] === false) {
            wx.showModal({
              title: '用户未授权',
              content: '如需正常使用该小程序功能，请按确定并在授权管理中选中“用户信息”，然后点按确定。最后再重新进入小程序即可正常使用。',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.openSetting({
                    success: function success(res) {
                      console.log(res)
                    }
                  });
                }
              }
            })
          } else if (authSetting['scope.userInfo'] === true) {
                      //该处用户获取用户的一些授权信息
            if (that.data.userInfo) {
              var nickname = that.data.userInfo.nickName;
              var gender = that.data.userInfo.gender
              //性别 0：未知、1：男、2：女
              if (gender == 1) {
                gender = "True"
              } else if (gender == 2) {
                gender = "False"
              } else {
                gender = "True"
              }
          
            }
          }
        }
      }
    })
  }

})
