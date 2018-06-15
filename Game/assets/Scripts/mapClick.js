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

    },


    start() {

    },

    preLevel() {
        if (com.selectedLevel > 0) {
            com.selectedLevel -= 1;
        }
    },

    nextLevel() {
        if (com.selectedLevel < com.currentLevel) {
            com.selectedLevel += 1;
        }
    },

    startGame() {
        cc.director.loadScene("gaming");
    },

    loadRank(){
        cc.director.loadScene("ranklist");
    }

});
