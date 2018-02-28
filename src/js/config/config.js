const config = {

    heart:{
        x:undefined,
        y:undefined,
        minSize: 15,
        maxSize: 20,
        size: undefined,
        speed: 0.5,
    },
    fireworks:{
        x: undefined,
        y: undefined,
        xEnd: undefined,
        yEnd: undefined,
        size: 2,
        radius: 2,  //烟花半径
        velocity: 3,  //速率
        opacity: 0.8,
        count: 300,   //炸裂后粒子数
        wait: undefined,  //消失后 => 炸裂  等待时间
        color: undefined,  //烟花颜色
    },
    fireworkInterval:[60, 240],// 烟花产生间隔 //---不建议改动
    skyColor:'hsla({hue}, 60%, {lightness}%, 0.2)',
    fireOpt: {
        wordInterval: 600, //每段话出现的间隔时间
    },
    shape:{
        mini: 1,   //组成字的粒子数  mini越大 粒子数越少
        gap: 3,   //粒子的间隔数 必须能被width整除
    },
    word:{
        size: 70,
        y: 120
    },

}
export default config