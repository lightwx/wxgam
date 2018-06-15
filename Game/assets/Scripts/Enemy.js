// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var Common = require('Common')
cc.Class({
    extends: cc.Component,

    properties: {
        Game: {
            default: null,
            serializable: false,
        },
        maxExistTime: 2,
        existTime: 0,
        touchAudio: {
            default: null,
            url: cc.AudioClip,
        },
    },

    // LIFE-CYCLE CALLBACKS:
    //新建Enemy的计时器和存在时间
    newEnemyFun: function () {
        this.existTime = this.maxExistTime * (1 - Common.selectedLevel / 39)
        this.timer = 0;
    },
    //触摸开始事件
    touchstart: function (touch, event) {

    },
    //触摸移动事件
    touchmove: function (touch, event) {

    },
    //触摸结束事件
    touchend: function (touch, event) {
        //得到触点的坐标（location.x, location.y）
        var location = touch.getLocation();
        this.killEnemy(location.x, location.y);        
        //添加炮弹发射音效
        cc.audioEngine.playEffect(this.touchAudio, false);
    },
    killEnemy: function (x, y) {
        //如果触点在敌人的范围内，杀死敌人并进行加分
        //在这里添加击杀音效       
        this.Game.score++;
        
        //击杀敌人爆炸动画
        let boomNode = cc.find('boom');
        let boomAnimation= cc.find('boom').getComponent(cc.Animation);
        boomNode.x = x;
        boomNode.y = y;
        boomAnimation.play('boom');
               
        if (this.Game.timer > 1) {
            this.Game.timer -= 1;
        } else {
            this.Game.timer = 0;
        }
        this.toGone();
        return;
    },
    playBoom: function(){
        
    },
    //到达时间后执行的消失函数
    toGone: function () {
        this.node.destroy();
    },
    onLoad() {
        this.timer = 0;
        //添加监听事件
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchstart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchmove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchend, this);
    },


    start() {

    },


    update(dt) {
        //
        this.timer += dt;
        if (this.timer > this.existTime) {
            this.toGone();
            return;
        }
        var opacityRatio = 1 - this.timer / this.existTime;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity))
    },
});
