import Utils from '../config/utils'


class Particle {
    constructor({x,y,minSize = 5,maxSize = 7.5,size, opacity = 1,speed =  1, width,height} = {}){
        this.size = size ? size : Utils.random(minSize,maxSize)
        this.x = x ? x : Utils.random(0,width-this.size)
        this.y = y ? y : -this.size
        this.speed = speed
        this.opacity = opacity
        this.clientWidth = width
        this.clientHeight = height
        this.color = 'rgb(255,255,255)'
    }
    outOfBounds(){
        return !(this.x >= -this.size && this.x <= this.clientWidth && this.y <= this.clientHeight && this.y >= -this.size)
    }
    fall(){
        this.y += this.speed;
    }
    render(ctx){
        this.fall();
        if(this.outOfBounds()) return false;
        ctx.beginPath();
        ctx.fillStyle = this.color

        ctx.arc(this.x,this.y,this.size, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.fill()

        return true;
    }
}
export default Particle