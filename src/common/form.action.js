export default {


  install: function (Vue, options) {



  	Vue.prototype.postAction = function(url, data, params = null, callback) {
      let $this = this;

      $this.$http.post(url, data, {params: params, headers: {'Content-Type': 'application/json; charset=utf-8'}}).then(function(res) {
        let result = {}, data = res.body;
        if(data && typeof(data)  === 'string'){
          data = JSON.parse(data);
        }
        switch (data.code) {
          case 200:
            result = data;
            break;
          case -1:
            layer.msg(data.msg);
            break;
          case 10005:
            window.sessionStorage.clear();
            
            layer.msg(res.body.msg, {
              time: 1000
            }, function() {
              location.href = '../';
            });
            // $this.$router.push({
            //   name: 'index'
            // });
            break;
          default:
            layer.msg(data.msg);
        }

        $this.callback = callback;
        $this.callback(result);
      });
    };

  	Vue.prototype.userLogout = function() {
  		this.$http.get(this.config.host + this.path.substr(1) + 'Logout.action', {}).then(function(res) {
  			
				sessionStorage.clear();
				layer.msg(res.body.msg, {
					time: 1000
				}, function() {
					location.href = '../';
				});
				// this.$router.push({name: 'index'});
			});
	}

	Vue.prototype.userLoginApi = function(query) {
		let domainItems = [location.hostname, 'www.newyali.cn', 'www.newyali.com', 'cloud.newyali.cn', 'cloud.newyali.com', 'im.newyali.cn', 'im.newyali.com', 'pms.newyali.cn', 'pms.newyali.com', 'ucenter.newyali.com', 'ucenter.newyali.cn', 'www.yalipms.com'];
		let urlreg = new RegExp('^http(?:s)?:\\/\\/([^\\/:]*)(?::\\d+)?\\/[^\\s]*$', 'gi');
		let urlrefer = document.referrer;
		let domain = urlrefer.replace(urlreg, '$1');

			// if($.inArray(domain, domainItems) != -1) {
				if(query != null) {
					this.$http.post(this.config.userpath.substr(0, this.config.userpath.lastIndexOf('/')) + this.path.substr(1) + 'LoginApi.action', 
						query,
						{headers: {'Content-Type': 'application/json; charset=utf-8'}}).then(function(res) {
						if(res.body.code == 200){
					    this.setPersonal({usertype: res.body.data.type, personal: res.body.data});
					    this.$router.push({name: this.route});
					  	layer.msg(res.body.msg);    
		      	} else {
				    	layer.open({
							  title: '登录失败，稍后请重试',
							  content: res.body.msg,
							  yes: function(index, layero){
									window.history.back();
							    layer.close(index);
							  }
							});
		      	}
			    }, function(res) {
			    	layer.open({
						  title: '登录失败，稍后请重试',
						  content: res.body.msg,
						  yes: function(index, layero){
								window.history.back();
						    layer.close(index);
						  }
						});
			    });				
				} else {
					layer.open({
					  title: '登录接口异常',
					  content: '登录超时或请求异常，页面即将关闭',
					  yes: function(index, layero){
							window.opener = null;
							window.open('','_self');
							window.close();
					    layer.close(index);
					  }
					});
				}
			// } else {
			// 	layer.open({
			// 		  title: '登录接口异常',
			// 		  content: '登录来源地址不合法',
			// 		  yes: function(index, layero){
			// 				window.opener = null;
			// 				window.open('','_self');
			// 				window.close();
			// 		    layer.close(index);
			// 		  }
			// 		});
			// }
		}

		Vue.prototype.userLogin = function(formName) {
			this.$refs[formName].validate((valid) => {
        if (valid) {
					this.$http.post(this.config.userpath.substr(0, this.config.userpath.lastIndexOf('/')) + this.path.substr(1) + 'Login.action',
						JSON.stringify(this.item),
						{headers: {'Content-Type': 'application/json; charset=utf-8'}}).then(function(res) {
						if(res.body.code == 200){
			        this.setPersonal({usertype: formName, personal: res.body.data});
							this.$router.push({name: this.route});
	        	} else{//返回其他非200的码
	        		this.random = Math.random();
	        	}	
		       layer.msg(res.body.msg);
			    });
        } else {//本地form校验
	      	this.random = Math.random();
          return false;
        }
      });
		}
		Vue.prototype.formSubmit = function(formName) {
			this.$refs[formName].validate((valid) => {
        if (valid) {
					this.$http.post(this.config.userpath + this.path.substr(1) + 'Modify.action',
						JSON.stringify(this.item),
						{headers: {'Content-Type': 'application/json; charset=utf-8'}}).then(function(res) {
						if(res.body.code == 200){
							if(this.hasOwnProperty('route') && this['route'] != '') {
								this.$router.push({name: this.route}); //要改，要用tabActive方法
							} else {
								this.initItem();
			        }
		        	layer.msg(res.body.msg);
	        	} else if (res.body.code == 10005){
	            window.sessionStorage.clear();	            
	            layer.msg(res.body.msg, {
	              time: 1000
	            }, function() {
	              location.href = '../';
	            });
		        } else{
		        	 layer.msg(res.body.msg);
		        }
			    }, function(res) {
			      layer.msg(res.body.msg);
			    });
        } else {
        	layer.msg('校验不通过，请检查提交的信息是否有误');
          return false;
        }
      });
		}

		Vue.prototype.formReset = function(formName) {
			this.$refs[formName].resetFields();
		}

		Vue.prototype.formExport = function(formName) {
			let obj = this;
			if (obj.property.length > 0) {
				let str = 'columns=' + obj.property.join('&columns=');
				layer.confirm('需要导出:' + obj.property.join(',') + '？', {
					btn: ['确定', '取消']
				}, function(index, layero) {
					$('iframe').attr('src', obj.config.host + window.location.pathname.substr(0, 7) + obj.exportPath + '?' + str);
					layer.close(index);
				});
			} else {
				layer.confirm('您还未选择需要导出的列,是否需要全部导出？', {
					btn: ['确定', '取消']
				}, function(index, layero) {
					$('iframe').attr('src', obj.config.host + window.location.pathname.substr(0, 7) + obj.exportPath);
					layer.close(index);
				});
			}
		}


    Vue.prototype.aesEncrypt = function(json, callback) {
      let $this = this;
      let result = null;
      
      $this.postAction($this.config.host + '/api/lim/aes/aesEncrypt.action', JSON.stringify(json), null, function(res) {
        if (res.code == 200) {
          result = res.data;
        }
        $this.callback = callback;
        $this.callback(result);
      });
    }

    Vue.prototype.aesDecrypt = function(str, callback) {
      let $this = this;
      let result = null;
      $this.postAction($this.config.host + '/api/lim/aes/aesDecrypt.action', str, null, function(res) {
        if (res.code == 200) {
          result = res.data;
        }
        $this.callback = callback;
        $this.callback(result);
      });
    }

	}
}