import '@/css/common.scss'
import Utils from './config/utils'
import Config from './config/config'

import Heart from './particle/heart'
//烟花
import Firework from './firewors/fireworks'

import ShapeMaker from './other/shape'

{
    class Canvas{
        constructor(){
            this.initProperty()
            this.init()
            this.initAudio()
        }
        initAudio(){
            const audio = new Audio();
            audio.src = require('@/audio/lightPursuer.mp3');
            audio.loop = true;
            audio.play();
            audio.volume = 0.5;
            const music = document.querySelector('#music');
            document.addEventListener("WeixinJSBridgeReady", function () {
                audio.play();
            }, false);

            audio.addEventListener('canplaythrough',function(){
                music.style.display = 'block'
                this.loopFire();
            }.bind(this));
            music.onclick = function(){
                const cla =  this.getAttribute('class');
                if(cla == 'on'){
                    this.setAttribute('class', 'off');
                    audio.pause();
                }else{
                    this.setAttribute('class', 'on');
                    audio.play();
                }
            }
        }
        initProperty(){
            this.width = document.documentElement.clientWidth
            this.height = document.documentElement.clientHeight
            this.clientOpts = {
                width:this.width,
                height:this.height
            }
            this.domHeartCanvas = document.querySelector('#CHeart')
            this.ctx = this.domHeartCanvas.getContext('2d')
            this.domHeartCanvas.width = this.width
            this.domHeartCanvas.height = this.height
            this.particleList = []
            this.time = 0


            this.domFireWorkCanvas = document.querySelector('#CFireWork')
            this.fireworkCtx = this.domFireWorkCanvas.getContext('2d')
            this.domFireWorkCanvas.width = this.width
            this.domFireWorkCanvas.height = this.height

            //天空颜色
            this.skyColor = {
                hue: 210,
                lightness: 0
            };

            this.fireWords = [
                {
                    txt:'3',
                    size:120
                },
                {
                    txt:'2',
                    size:130
                },
                {
                    txt:'1',
                    size:140
                },
                {
                    txt:'ฅ˙o˙ฅ',
                    size:70
                },
                {
                    txt:'薇',
                    size:120
                },
                {
                    txt:'❤',
                    size:120
                },
                {
                    txt:'VV',
                    size:90
                },
                {
                    txt:'I ❤ U',
                    size:60
                },
                {
                    txt:'ILOVEU',
                    size:70
                },
                {
                    txt:'❤ ❤ ❤',
                    size:90
                },
                {
                    txt:'❤❤❤❤❤',
                    size:80
                },
                {
                    txt:'❤',
                    size:140
                },
                {
                    txt:'ฅ˙o˙ฅ',
                    size:70
                },
                {
                    txt:'BestWishes',
                    size:40
                },
                {
                    txt: '❤',
                    size:140
                },
                {
                    txt:'平平安安',
                    size:70
                },
                {
                    txt: '❤ ❤',
                    size:100
                },
                {
                    txt:'幸福康宁',
                    size:70
                },
                {
                    txt:'End',
                    size:90
                }
            ]
            
            //烟花的数组
            this.fireworks = [];
            this.fireworkTime = Utils.random(...Config.fireworkInterval) | 0;
            this.fireOpt = Utils.extend({
                end: false,
                time: 600,
                showWords: false,
            }, Config.fireOpt);

            this.fireworkCtx.fillStyle = `hsla(${this.skyColor.hue}, 60%, ${this.skyColor.lightness}%, 1)`
            this.fireworkCtx.fillRect(0,0,this.width,this.height);

        }
        init(){
            this.shapeMaker = new ShapeMaker(this.width, this.height);
            this.loop();


        }
        loop(){
            requestAnimationFrame(this.loop.bind(this));

            // 动画的时间
            ++this.time >= 60000 ? 0 : this.time;

            // 渲染飘落装饰
            this.renderParticle();




        }
        loopFire(){
            requestAnimationFrame(this.loopFire.bind(this));

            this.controlFire();
            this.renderFireworks();
        }
        renderParticle(){
            this.ctx.clearRect(0,0,this.width,this.height);
            this.time % 60 == 0 && this.particleList.push(new Heart({width:this.width,height:this.height}));
            for(let i = this.particleList.length - 1; i >= 0; --i){
                !this.particleList[i].render(this.ctx) && this.particleList.splice(i,1);
            }
        }


        //控制烟花的逻辑
        controlFire(){
            --this.fireOpt.time;

            if(this.fireOpt.time <= 350){
                this.showFireworkWords();
            }
            if(this.fireOpt.time % 450  == 0){
                this.fireworks.push(new Firework({
                    width:this.width,
                    height:this.height,
                    x: undefined,
                    y: undefined,
                    xEnd: undefined,
                    yEnd: this.height / 8,
                    count: 600,
                    radius: 5
                }));
            }

            if(this.fireOpt.time % 400 == 0){
                this.createDenseFire();
                //重置屏幕
                // this.fireworkCtx.fillStyle = `hsla(${this.skyColor.hue}, 60%, ${this.skyColor.lightness}%, 1)`
                // this.fireworkCtx.fillRect(0,0,this.width,this.height);

            }

        }

        //创建密集的烟花
        createDenseFire(){
            let _count = Utils.random(6,10)
            for(let i = 0; i < _count; i++){
                setTimeout(() => {
                    this.fireworks.push(new Firework(Object.assign({},Config.fireworks,this.clientOpts)));
                }, i * 100);
            }
        }

        //渲染烟花
        renderFireworks(){
            this.fireworkCtx.fillStyle = Config.skyColor.replace('{lightness}', 5 + this.skyColor.lightness * 15).replace('{hue}' , this.skyColor.hue);
            this.fireworkCtx.fillRect(0,0,this.width,this.height);
            //随机创建烟花
            this.createFireworks();

            this.skyColor = {
                lightness: 0,
                hue: 210
            };
            for(let i = this.fireworks.length - 1; i >= 0; --i){
                this.skyColor = this.skyColor.lightness >= this.fireworks[i].getSkyColor().lightness ? this.skyColor : this.fireworks[i].getSkyColor();
                !this.fireworks[i].render(this.fireworkCtx) && this.fireworks.splice(i,1);
            }
        }

        // 随机创建烟花
        createFireworks(){

            if(--this.fireworkTime <= 0){
                this.fireworks.push(new Firework(Object.assign({},Config.fireworks,this.clientOpts)));
                this.fireworkTime = Utils.random(...Config.fireworkInterval) | 0;
            }
        }
        //文字烟花
        showFireworkWords(){
            if(this.fireWords.length == 0){
                // this.fireOpt.end = true;
                // this.fireOpt.time = 180;
                return ;
            }
            if(--this.fireOpt.wordInterval <= 0){
                // 第二个参数控制是否产生烟花
                this.getDotsPostion(this.fireWords.shift(), true);
                this.fireOpt.wordInterval = Config.fireOpt.wordInterval;
            }
        }
        //获取所有的dots集合。
        getDotsPostion(wordsArr, showFireworks){
            const words = wordsArr.txt.split('')
            const length = words.length;
            const size = wordsArr.size
            const y = Config.word.y;
            const dotsArr = [];

            words.forEach((item,index)=> {
                let x;
                //文字居中
                length % 2 == 0 ? x = this.width / 2 + (index - length / 2) * size + 1 / 2 * size : x = this.width / 2 + (index - Math.floor(length / 2)) * size;
                this.shapeMaker.write({txt:item, x, y, size});
                const dots = this.shapeMaker.getDots(Config.shape);
                dotsArr.push(...dots);

                const prtOption = {};
                showFireworks && this.fireworks.push(new Firework({wait:30, radius:2, x, yEnd: y, dots, prtOption,width:this.width,height:this.height}));
            });

            return dotsArr;
        }
    }
    new Canvas()
}

