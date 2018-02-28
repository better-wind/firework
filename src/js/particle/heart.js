import Particle from './particle'
const random = Math.random;
import Config from '../config/config'

class Heart extends Particle{
    constructor({x,y,minSize = Config.heart.minSize,maxSize = Config.heart.maxSize,size, opacity = 0.8,speed = Config.heart.speed,width,height} = {}){
        super({x,y,minSize,maxSize,size,opacity,width,height})
        this.speed = speed * (1 + Math.random());
        this.direction = Math.random() > 0.5 ? 0.5 : -0.5;
        this.color = `hsla(${random() * 360}, 90%, 65%, 1)`;
    }
    fall(){
        this.x += Math.random() * this.direction;
        this.y += this.speed;
    }
    render(ctx){
        this.fall();
        if(this.outOfBounds()) return false;
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.color;

        ctx.moveTo(this.x + 0.5 * this.size, this.y + 0.3 * this.size);
        ctx.bezierCurveTo(this.x + 0.1 * this.size, this.y, this.x,
            this.y + 0.6 * this.size, this.x + 0.5 *
            this.size, this.y + 0.9 * this.size);
        ctx.bezierCurveTo(this.x + 1 * this.size, this.y + 0.6 *
            this.size, this.x + 0.9 * this.size, this.y,
            this.x + 0.5 * this.size,
            this.y + 0.3 * this.size);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        return true;
    }

}
export default Heart