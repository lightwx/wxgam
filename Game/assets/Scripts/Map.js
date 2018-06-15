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
var xLocations = new Array(
                        481, 477, 174, 111, 192, 
                        525, 438, 426, 352, 322, 
                        259, 211, 241, 201, 288, 
                        264, 359, 448, 496, 365);
var yLocations = new Array(
                        545, 357, 428, 801, 926, 
                        976, 960, 897, 871, 813, 
                        783, 731, 689, 620, 590, 
                        503, 566, 699, 846, 731);

cc.Class({
    extends: cc.Component,


    properties: {

        loca: {
            default: null,
            type: cc.Node
        },
        mapPart:{
            default:[],
            type:cc.Node
        },
        bgm: {
            default: null,
            url: cc.AudioClip
        },
        levelDisplay:{
            default:null,
            type:cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //播放背景音乐
        var music = cc.audioEngine.play(this.bgm,true,0.5);
        if (com.currentLevel == com.maxLevel) {
            this.victory()
        }
        com.selectedLevel = com.currentLevel;
        for(var i=0;i<com.maxLevel+1;i++){
            if(i<=com.currentLevel){
                this.mapPart[i].active = true;
            }else{
                this.mapPart[i].active = false;
            }

        }
    },

    start() {
    },
    moveLoca() {
        this.loca.x = xLocations[com.selectedLevel];
        this.loca.y = yLocations[com.selectedLevel];
    },
    //播放通关动画效果
    victory() {

    },

    update() {
        this.moveLoca();
        this.levelDisplay.string = "第 "+(com.selectedLevel+1).toString()+" 关";
    },
    playMusic() {
        cc.audioEngine.playEffect(this.bgm, false);
    },

});
