
cc.Class({
    extends: cc.Component,

    properties: {
        display: cc.ScrollView,
        rankLabel:cc.Node,
        avatarImgSprite:cc.Sprite,
        rankitem:cc.Prefab,
        myRank:cc.Label,
        myname:null
    },

    start () {
        wx.onMessage(data => {
            switch (data.message) {
                case 'Show':
                    console.log("收到展示排行榜请求","这次玩到第",data.newscore,"关")
                    this._show(data.newscore);
                    break;
                case 'Hide':
                    this._hide();
                    break;
            }
        });
    },

    _show (newscore) {
        this.node.getChildByName("ScrollView1").getChildByName("view").getChildByName("content").removeAllChildren();
        let self = this;
        wx.getUserInfo({
            openIdList:['selfOpenId'],
            success:function(res){
                console.log("成功读取用户信息 %o",res);
                self.myname = res.data[0].nickName;
                self.createUserImage(self.avatarImgSprite,res.data[0].avatarUrl);
                self.initRank(newscore);
            }
        })
        console.log("111");
        //let moveTo = cc.moveTo(0.5, 0, 73);
        // this.display.runAction(moveTo);
        
        //this.rankLabel.runAction(moveTo);
        //this.display.node.getChildByName("View").getChildByName("Content").getComponent("ItemList").init();
        //console.log(this.display.getComponents(cc.Sprite))
    },

    _hide () {
        let moveTo = cc.moveTo(0.5, 0, 1000);
        //this.display.runAction(moveTo);
    },
    initRank(nc){
        //实现逻辑是收到主区域的新分数，首先从微信拉取这个人的分数进行比对，
        //如果不存在或者这次是最高得分，就更新，否则不理会，然后拉取所有好友的分数进行渲染
        let self = this;
        wx.getUserCloudStorage({
            keyList:["score"],
            success:function(res){
                console.log("获取用户托管分数",res.KVDataList);
                if(res.KVDataList.length==0 || nc>parseInt(res.KVDataList[0].value)){
                    //微信还未托管分数或者本次获得最高分，进行分数设置
                    wx.setUserCloudStorage({
                        KVDataList:[{ key :"score", value : nc.toString()}],
                        success:function(){
                            console.log("成功设置用户分数")
                            self.drawRankItem();
                        }
                    })
                }else{
                    self.drawRankItem()
                }
                
            }
        })
    },
    drawRankItem(){
        let self = this;
        console.log("绘制排行榜");
        wx.getFriendCloudStorage({
            keyList:["score"],
            success:function(res){
                console.log("一起游戏的好友数据 %o",res.data);
                //先对好友的通关数排序
                res.data.sort((a,b)=>{ return b.KVDataList[0].value-a.KVDataList[0].value});
                console.log("排序后的数据 %o",res.data);
                for(let i =0;i<res.data.length;i++){
                    self.addRankitem(i,res.data[i]);
                }
            }
        })
    },
    addRankitem(rank,data){
        console.log(this.myname);
        if(data.nickname == this.myname) {
            this.myRank.string = "第"+(rank+1)+"名";
        }
        console.log("绘制第",rank,"个rankitem");
        //对每一个好友绘制ranklist并添加到content
        let content = this.node.getChildByName("ScrollView1").getChildByName("view").getChildByName("content");
        let item = cc.instantiate(this.rankitem);
        item.getComponent("ItemTemplate").init(rank+1,data);
        content.addChild(item);
        
    }
    ,
    createUserImage(sprite,url){

        console.log("正在创建用户头像",url,sprite);
        let image = wx.createImage();
        image.onload = () => {
            console.log("图片加载回调函数");
            let texture = new cc.Texture2D();
            texture.initWithElement(image);
            texture.handleLoadedTexture();
            sprite.spriteFrame = new cc.SpriteFrame(texture);
        }
        image.src = url;
    }
});
