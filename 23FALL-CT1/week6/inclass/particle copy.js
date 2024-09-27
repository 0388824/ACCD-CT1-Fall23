class Particle{
    constructor(_posX = width* 0.5, _posY = height* 0.5){
        this.position = createVector(_posX, _posY)
        this.velocity = p5.Vector.random2D()
        this.velocity.mult(4)
        this.cColor = color(random(TWO_PI),random(0.3, 1),random(0.5, 1))
        this.cRadius = 15
    }

    display(){
        fill(this.cColor)
        noStroke()
        circle(this.position.x, this.position.y, this.cRadius *2)
    }

    move(){
        this.position.add(this.velocity)

        //left edge
        if(this.position.x - this.cRadius <= 0){
            this.position.x = this.cRadius
            this.velocity.x *= -1
        }

    // right edge
        if(this.position.x + this.cRadius >= width){
            this.position.x = width - this.cRadius
            this.velocity.x *= -1
        }

    //top edge
        if(this.position.y - this.cRadius <= 0){
            this.position.y = this.cRadius
            this.velocity.y *= -1
        }

    //bottom edge
        if(this.position.y + this.cRadius >= height){
            this.position.y = height - this.cRadius
            this.velocity.y *= -1
        }
    }

    reachOut(_allParticles = []){
        _allParticles.forEach( (otherP)=> {
            if(otherP != this){
                if(this.position.dist(otherP.position) <= 150){
                    stroke(this.cColor)
                    strokeWeight(2)
                    line(this.position.x, this.position.y, otherP.position.x, otherP.position.y)
               }
            }

        })
    }
}