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
var timeLimit = 10;
cc.Class({
    extends: cc.Component,

    properties: {
        enemyPrefab: {
            default: null,
            type: cc.Prefab
        },
        policePrefab: {
            default: null,
            type: cc.Prefab
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        lifePart: {
            default: [],
            type: cc.Node
        },
        progressBar:{
            default:null,
            type:cc.ProgressBar
        },
        score: 0,
        life: 0,
    },

    // LIFE-CYCLE CALLBACKS:
    //添加一个新的敌人
    newEnemy() {
        var newEnemy = cc.instantiate(this.enemyPrefab);
        this.node.addChild(newEnemy);
        //设置新的敌人出现的位置
        newEnemy.setPosition(this.randomPosition());
        newEnemy.getComponent("Enemy").Game = this;
        newEnemy.getComponent("Enemy").newEnemyFun();
    },
    //添加新的警察
    newPolice() {
        var newPolice = cc.instantiate(this.policePrefab);
        this.node.addChild(newPolice);

        newPolice.setPosition(this.randomPosition());
        newPolice.getComponent("Police").Game = this;
        newPolice.getComponent("Police").newPoliceFun();
    },
    onLoad() {
        this.progressBar.totalLength=180;
        cc.log("第"+com.selectedLevel.toString()+"关");
        this.score = 0;
        this.timer = 0;
        this.life = 3;

        //定时生成相应对象的计时器
        this.generateEnemyTimer = 0;
        this.generatePoliceTimer = 0;

        com.levelClear = false;
    },

    randomPosition() {
        //x的范围从（enemy.width,720-enemy.width）
        var randX = cc.randomMinus1To1() * 320;
        var randY = cc.randomMinus1To1() * 550 - 60;
        return cc.p(randX, randY);
    },

    start() {

    },

    levelUp() {
        //通过了最新的关卡，解锁新关卡
        if (com.selectedLevel == com.currentLevel) {
            com.currentLevel += 1;
        }
    },
    //渲染生命值图标
    renderLife() {
        for (var i = 0; i < 3; i++) {
            if (i < this.life) {
                this.lifePart[i].active = true;
            } else {
                this.lifePart[i].active = false;
            }
        }
    },
    //关卡游戏时间到，进行通关判断
    timesUp() {
        if(this.score>(1+com.selectedLevel)*5-1){
            com.levelClear = true;
            this.levelUp();
        }
        cc.director.loadScene("counter");
    },
    //生命值用完，游戏失败
    runOutLife() {
        cc.log("任务失败");
        cc.director.loadScene("counter");
    },

    update(dt) {
        if(this.score > (1+com.selectedLevel)*5-1){
            this.timesUp();
        }
        if (this.life == 0) {
            this.life = -1;
            this.runOutLife();
        }
        this.timer += dt;
        this.progressBar.progress=1-this.timer/timeLimit;
        this.generateEnemyTimer += dt;
        this.generatePoliceTimer += dt;
        if (this.timer >= timeLimit) {
            this.timer = -10;
            this.timesUp();
        }
        if (this.generateEnemyTimer >= 1) {
            this.newEnemy();
            this.generateEnemyTimer = 0;
        }
        if (this.generatePoliceTimer >= 1.5) {
            this.newPolice();
            this.generatePoliceTimer = 0;
        }
        this.scoreDisplay.string = "Score: " + this.score.toString();
        this.renderLife();
    },
});
  