// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var com = require("Common");
cc.Class({
    extends: cc.Component,

    properties: {
        /*statusDisplay: {
            default: null,
            type: cc.Label
        },*/
        next: {
            default:null,
            type:cc.Node
        },
        again: {
            default:null,
            type:cc.Node
        },
        success: {
            default:null,
            type:cc.Node
        },
        fail: {
            default:null,
            type:cc.Node
        }，
		dkjfls：{
			default:null,
			type:cc.node
		}
    },

    onLoad() {
        if(com.levelClear == true){
            this.success.active = true;
            this.fail.active = false;
            var action = cc.repeatForever(
                    cc.sequence(
                        this.success.runAction(cc.scaleTo(0.5,0.8)),
                        this.success.runAction(cc.scaleTo(0.5,1)),
                    ));
            this.success.runAction(action);
            //this.statusDisplay.string = "闯关成功！！！";
            this.next.active = true;
            this.again.active = false;
            //this.node.getChildByName("continue").getChildByName("Label").getComponent(cc.Label).string="继续闯关";

            com.selectedLevel ++;
        }else{
            this.success.active = false;
            this.fail.active = true;
            var action = cc.repeatForever(
                cc.sequence(
                    this.fail.runAction(cc.scaleTo(0.5,0.8)),
                    this.fail.runAction(cc.scaleTo(0.5,1)),
                ));
            this.fail.runAction(action);
            //this.statusDisplay.string = "闯关失败~~~";
            this.next.active = false;
            this.again.active = true;
            //this.node.getChildByName("continue").getChildByName("Label").getComponent(cc.Label).string="重来本关";
        }
    },

    start() {

    },

    // update (dt) {},
});
