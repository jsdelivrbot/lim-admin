export default {

  install: function(Vue, options) {

    Vue.prototype.getSource = function(url, params = null, callback) {
      let $this = this;

      $this.$http.get(url, {params: params}).then(function(res) {
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

    Vue.prototype.getData = function(key, path, params = null) {
      let $this = this;
      let url = $this.config.userpath + path.substr(1);
      $this.getSource(url, params, function(res) {
        if (res.code === 200) {
          $this[key] = res.data;
        }
      });
    };

    Vue.prototype.initItem = function() {
      let $this = this;
      let url = $this.config.userpath + $this.path.substr(1) + 'Init.action';
      $this.getSource(url, $this.$route.query, function(res) {
        if (res.code === 200) {
          $this.item = res.data;
        }
        
        $this.loading = false;
      });
    }

    Vue.prototype.initRules = function() {
      let $this = this;
      // let url = '../static/validation' + $this.path.substr(1) + '-validation.json'; //这里是本地化校验文件配置，你可以测试一下。
      let url = $this.config.userpath + $this.path.substr(1) + '-validation.json';
      $this.getSource(url, $this.$route.query, function(res) {
        if (res.code === 200) {
          $this.rules = res.data
        }
        
        $this.loading = false;
      });
    }

    Vue.prototype.initForm = function() {
      let $this = this;
      // let url1 = '../static/validation' + location.pathname.substr(0, location.pathname.indexOf('/', 1)) + $this.path.substr(1) + '-validation.json'; //这里是本地化校验文件配置，你可以测试一下。
      let url1 = $this.config.userpath + $this.path.substr(1) + '-validation.json';
      let url2 = $this.config.userpath + $this.path.substr(1) + 'Init.action';

      $this.getSource(url1, $this.$route.query, function(res) {
        if (res.code === 200) {
          $this.rules = res.data;  
        }
        
        $this.loading = false;
      });

      $this.getSource(url2, $this.$route.query, function(res) {
        if (res.code === 200) {
          $this.item = res.data;
        }
        
        $this.loading = false;
      });
    }

    Vue.prototype.listItems = function(url, option) {
      let $this = this;
      url = url || $this.config.userpath + $this.path.substr(1) + '-items.json';
      let params = Object.assign($this.$route.query, option);
      $this.getSource(url, params, function(res) {
        if (res.code === 200) {
          $this.count = res.count;
          $this.items = res.data;
        } else {
          $this.items = [];
        }
        
        $this.loading = false;
      });
    }

    Vue.prototype.viewItem = function(url, option) {
      let $this = this;
      url = url || $this.config.userpath + $this.path.substr(1) + 'Init.action';      
      let params = Object.assign($this.$route.query, option);

      $this.getSource(url, params, function(res) {
        if (res.code === 200) {
          $this.item = res.data;
        } else {
          $this.item = {};
        }
        
        $this.loading = false;
      });
    }

    Vue.prototype.listTrees = function(url, option, index) {
      let $this = this;
      url = url || $this.config.userpath + $this.path.substr(1) + '-items.json';
      let params = Object.assign($this.$route.query, option);

      if ($this.items[index].isopen == 0) {
        $this.getSource(url, params, function(res) {
          if (res.code === 200) {
            let temp1 = $this.items.slice(0, index + 1);
            let temp2 = $this.items.slice(index + 1);
            $this.items = temp1.concat(res.data).concat(temp2);
            $this.items[index].isopen = 1;
          }
        });
      } else {
        let length = 0;
        for (let i = index + 1; i < $this.items.length; i++) {
          if ($this.items[i].level <= $this.items[index].level) {
            break;
          } else {
            length++;
          }
        }
        $this.items.splice(index + 1, length);
        $this.items[index].isopen = 0;
      }
    }

    Vue.prototype.mouldDownLoad = function() {
      let $this = this;
      let url = $this.config.host + window.location.pathname.substr(0, 7) + $this.path.substr(1) + 'Tmpl.action';
      $('iframe').attr('src', url);
    }

    Vue.prototype.reomveItem = function(option, tips = null) {
      let $this = this;
      let url = $this.config.userpath + $this.path.substr(1) + 'Delete.action'

      var count = 0;
      if(tips != null){
        layer.confirm(tips, {icon: 3, title:'提示'},function(index) {
          $this.getSource(url, option, function(res) {
            if (res.code === 200) {
              $this.listItems();
            }
            layer.msg(res.msg);
          })
          layer.close(index);
          console.log(123,count);
        })
      } else {
      console.log(33,tips);
        layer.confirm('确认删除吗？',{icon: 3, title:'提示'}, function(index) {
          $this.getSource(url, option, function(res) {
            if (res.code === 200) {
              $this.listItems();
            }
            layer.msg(res.msg);
          })
          layer.close(index);
        })
      }
    }

    Vue.prototype.getPrivilege = function(option) {
      let $this = this;
      let url = $this.config.userpath + '/privilege-items.json';
      let cid = null;
      let tabActive = $this.tabActive;
      $this.tabItems.forEach((tab, index) => {
        if (tab.name == tabActive) {
          cid = tab.id;
        }
      });
      let params = Object.assign({
        id: cid
      }, option);
      $this.getSource(url, params, function(res) {
        if (res.code === 200) {
          $this.privileges = res.data;
        }
      });
    }
  }
};