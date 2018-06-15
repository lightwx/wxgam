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
        }
    },
    newPoliceFun: function () {
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
        this.killPolice(location.x, location.y);
        //添加炮弹发射音效
        cc.audioEngine.playEffect(this.touchAudio, false);
    },
    killPolice: function (x, y) {
        //如果触点在警察的范围内，杀死警察并进行扣分
        //在这里添加击杀音效
        this.Game.life--;
        this.toGone();
        return;
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
