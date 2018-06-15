// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        //跳跃高度
        jumpHeight:0,
        //跳跃持续时间
        jumpDuration:0,
    },

    // LIFE-CYCLE CALLBACKS:
    setJumpAction(){
        //上升
        var jump=cc.moveBy(this.jumpDuration,cc.p(0,this.jumpHeight)).easing(cc.easeCubicActionInOut());
        return cc.repeatForever(jump);
    }
    ,
    onLoad () {
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);
    },

    start () {

    },

    // update (dt) {},
});
