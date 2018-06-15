cc.Class({
    extends: cc.Component,
    properties: {
        userImg:cc.Sprite,
        userRank:cc.Sprite,
        textRank:cc.Label,
        nickname:cc.Label,
        score:cc.Label,
    },
    init:function(rank,data){
        
        console.log("渲染具体item",rank,data);
        this.createImage(this.userImg,data.avatarUrl);
        this.createImage(this.userRank,"");
        this.textRank.string = rank;
        this.nickname.string = data.nickname;
        this.score.string = "第"+data.KVDataList[0].value+"关";
    },
    createImage(sprite,url){
        if(url==""){
            sprite.node.active = false;
            return;
        }
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