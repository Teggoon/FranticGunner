
    var sketchProc = function(processingInstance) {
     with (processingInstance) {
        size(400, 400);
        frameRate(50);

/**
 * Thank you all so much for your votes and feedback! Thank you for checking this out! I really appreciate it. Thank you!
 *
* Frantic Gunner! Hope y'all like it!
*
* My highest score is 690. Can you beat that?
*
*       samueljozjasz           - 20220
*       𝔸𝕩𝕖𝕟𝕠𝕤 𝕥𝕙𝕖 𝔻𝕁 ℙ𝕆𝕋𝔸𝕋𝕆  - 15070
*       Richard Vaneveld        - 12410
*       Benten Taing            - 10570
*       Austin whitmore         - 10250
*       Jason                   - 8950
*       Kiefer                  - 7270
*       25ghostspartan          - 6900
*       JK Studios              - 6280
*       ᑕᗩᑌᔕTIᑕᘔEᑭᕼYᖇ (Team Erudite) - 4240
*
*/




var keys=[];
var scene='menu';
var destination='';
var score=0;
var highscore=0;
var px=200;
var money=0;
var py=0;
var pr=0;
var plife=100;
rectMode(CENTER);
textAlign(CENTER, CENTER);
textFont(createFont("impact"));
var appear=0;//actually this is the variable determining the spawning of enemies
var reload=0;//the var that determines the player's gun's reload

var regen=3;//regeneration.
var reloadspeed=1;//gun reload speed aka fire rate
var launchspeed=6;//bullet speed
var moneygain=1;

var bullets=[];
var bullet = function (x,y,r,v){
    this.pos=new PVector(x,y);
    this.vel=new PVector(cos(r),sin(r));
    this.vel.mult(v);
};
bullet.prototype.draw = function() {
    this.pos.add(this.vel);
    noStroke();
    fill(255, 255, 255);
    ellipse(this.pos.x,this.pos.y,6,6);
};
//the bullet collision function
bullet.prototype.col = function(e) {
    if (dist(this.pos.x,this.pos.y,e.pos.x,e.pos.y)<=4+e.size/2){
        e.life-=10;
        this.pos.x=900;
        if (e.type===''){
            money+=round(e.size/3)*moneygain;
        }
    }
};

//constructor function for the enemies and the player. if this.type is 'p' then it's the player. otherwise it's an enemy
var huh = function(x, y,r,type) {
    this.pos=new PVector(x,y);
    this.vel=new PVector(cos(r),sin(r));//velocity
    this.vel.mult(3);
    this.r=0;
    this.type=type;
    this.size=30;
    if (this.type==='p'){
        this.life=110;
    } else {
        this.life=10;
    this.size=random(30,50);
    }
    this.reload=0;
};
huh.prototype.draw = function() {
    if (this.type==='p'){
        if (this.life<110&&appear===30){
            this.life+=regen;
        }
            plife=this.life;
        this.r=atan2(mouseY-this.pos.y,mouseX-this.pos.x);
        px=this.pos.x;
        py=this.pos.y;
        pr=this.r;
    } else {
        this.r=atan2(py-this.pos.y,px-this.pos.x);
    this.reload++;
    if (this.reload>120-(this.size*1.5)){
        bullets.push(new bullet(this.pos.x+cos(this.r)*this.size,this.pos.y+sin(this.r)*this.size,this.r,6));
        this.reload=0;
    }
    }
    pushMatrix();
    translate(this.pos.x, this.pos.y);
    if (this.type===''){scale(this.size/30);}
    pushMatrix();
    rotate(this.r);
    noStroke();
    fill(0, 0, 0);
    rect(15,0,30,10);
    popMatrix();
    rotate(-135);
    strokeWeight(3);
    stroke(217, 51, 0);
    fill(255, 42, 0);
    ellipse(0,0,30,30);
    noFill();
    strokeWeight(6);
    stroke(255, 255, 255,130);
    arc(0,0,25,25,radians(60),radians(120));
    stroke(115, 29, 0,50);
    strokeWeight(10);
    arc(0,0,18,18,radians(210),radians(180+150));
    if (this.type==='p'){
    stroke(255, 42, 0,200);
    strokeWeight(5);
    noFill();
    arc(0,0,43,43,0,radians((plife-10)*3.6));
    }
    popMatrix();
    this.pos.add(this.vel);
    if (this.pos.x>400||this.pos.x<0){
        this.vel.x*=-1;
    }
    if (this.pos.y>400||this.pos.y<0){
        this.vel.y*=-1;
    }
};
var huhs=[];
//the function that resets the game to the original state
var reset  = function() {
        huhs.splice(0,huhs.length);
        for (var i=0;i<3;i++){
huhs.push(new huh(random(0,400),0,random(0,180),''));
        }
        plife=110;
        huhs.push(new huh(0,200,104,'p'));
        appear=0;
        for (var i=0;i<bullets.length;i++){
        bullets[i].pos.x=900;
        }
};

var lightingupscene=false;
var light=0;
var lightfade=0;

    var button = function(x, y, w, h,tx, m) {
    this.x = x;
    this.y = y;
    this.w=w;
    this.h=h;
    this.tx = tx;
    this.m = m;
    this.move=0;
};
button.prototype.inm = function() {
    return dist(mouseX,mouseY,this.x,this.y)<=this.w/2;
};
button.prototype.draw = function() {
    pushMatrix();
    translate(this.x,this.y);
    scale(this.w/30,this.h/30);
    if (this.inm()){
        this.move+=(1.5-this.move)/5;
        if (mousePressed){
            this.move=1.8;
        }
        scale(this.move);
    }
    else {this.move+=(0-this.move)/5;}
    rotate(-135);
    strokeWeight(3);
    stroke(217, 51, 0);
    fill(255, 42, 0);
    ellipse(0,0,30,30);
    noFill();
    strokeWeight(6);
    stroke(255, 255, 255,130);
    arc(0,0,25,25,radians(60),radians(120));
    stroke(115, 29, 0,50);
    strokeWeight(10);
    arc(0,0,18,18,180+30,180+150);
    stroke(255, 42, 0,200);
    strokeWeight(3);
    noFill();
    arc(0,0,41,41,0,this.move*85);
    arc(0,0,48,48,0,this.move*170);

    fill(237, 237, 237);
    textSize(this.tx);
    textAlign(CENTER, CENTER);
    rotate(135);
    text(this.m, 0,0);
    popMatrix();
};
var buyrpm=new button(340,247,40,40,10,'Buy');
var buyregen=new button(340,301,40,40,10,'Buy');
var buyblspeed=new button(340,192,40,40,10,'Buy');
var buymoney=new button(340,352,40,40,10,'Buy');
var retry=new button(205,132,80,54,10,'Retry');

reset();
var play=new button(200,300,80,60,14,'Play');

//menu scene
var pause=false;
var menu = function() {
    scene='menu';
for (var i in bullets) {
            bullets[i].draw();
            if (bullets[i].pos.x>400||bullets[i].pos.x<0||bullets[i].pos.y>400||bullets[i].pos.y<0){
                bullets.splice(i,1);
            }
            }
    fill(184, 0, 0);
    textSize(58);
    text('Frantic Gunner',197,120);
    text('Frantic Gunner',197,123);
    fill(255, 42, 0);
    text('Frantic Gunner',200,120);
    fill(247, 247, 247);
    textSize(38);
    text('By Tegoon',197,201);
    play.draw();
for (var i =0;i<huhs.length;i++) {
            huhs[i].draw();}
};
var howpage=1;
var next=new button(200,334,80,60,14,'Next');
var how = function() {
    scene='how';
textFont(createFont("Trebuchet MS Bold"));
for (var i in bullets) {
            bullets[i].draw();
            if (bullets[i].pos.x>400||bullets[i].pos.x<0||bullets[i].pos.y>400||bullets[i].pos.y<0){
                bullets.splice(i,1);
            }
            }
    textSize(22);
    fill(255, 81, 0);
    switch(howpage){
        case 1:
    text('That\'s you.\nControl your gun with your mouse\nYou can\'t control where you go',200,180);
                strokeWeight(2);
                stroke(255, 255, 255);
            if (py>=200){
                line(px,py-40,px,py-100);
                line(px,py-40,px-10,py-50);
                line(px,py-40,px+10,py-50);
            } else {
                line(px,py+40,px,py+100);
                line(px,py+40,px-10,py+50);
                line(px,py+40,px+10,py+50);
            }
if (reload>30&&mousePressed&&plife>10){
    bullets.push(new bullet(px+cos(pr)*30,py+sin(pr)*30,pr,launchspeed));
    reload=0;
}
reload+=reloadspeed;
            break;
        case 2:
            text('Those are your enemies!\nThey shoot at you (and often miss). \nTake them out first!\nYou earn money by shooting them',200,180);
            break;
        case 3:
            text('Survive as long as you can!\n(Your health renegerates.)\nYou can buy upgrades at a shop\nafter death',200,180);
textFont(createFont("impact"));
            play.draw();
    }
textFont(createFont("impact"));
    fill(173, 0, 0);
    textSize(35);
    text('Instructions',200,61);
    fill(255, 42, 0);
    text('Instructions',200,59);
    if (howpage<3){
        next.draw();
    }
for (var i =0;i<huhs.length;i++) {
            huhs[i].draw();}
};

var regencost=250;
var rpmcost=250;
var speedcost=250;
var moneycost=250;

//shop/death scene
var shop = function() {
    scene='shop';
    fill(255, 42, 0);
    textSize(26);
    text('You died!\nScore: '+score+'          Highscore: '+highscore,200,56);
    fill(255, 255, 255);
    text('$'+round(money),64,141);
    buyrpm.draw();
    buyregen.draw();
    buyblspeed.draw();
    buymoney.draw();
    retry.draw();
    fill(255, 255, 255);
    textSize(22);
    textAlign(LEFT,CENTER);
    text('Faster gun reload for $' + round(rpmcost),16,248);
    text('Faster bullet speed for $' + round(speedcost),16,190);
    text('Faster renegeration for $' + round(regencost),16,302);
    text('More money gains for $' + round(moneycost),16,352);
    textAlign(CENTER,CENTER);
};

//main game scene
var game = function() {
    scene='game';
    appear++;
    if (appear===150){
        appear=0;
huhs.push(new huh(random(0,400),0,random(0,180),''));
huhs.push(new huh(random(0,400),0,random(0,180),''));
    }
for (var i =0;i<huhs.length;i++) {
            huhs[i].draw();
for (var j=0;j< bullets.length;j++) {
            bullets[j].col(huhs[i]);}
            }

for (var i =0;i<huhs.length;i++) {
    if (huhs[i].life<=0){
        huhs.splice(i,1);
    }
}
for (var i in bullets) {
            bullets[i].draw();
            if (bullets[i].pos.x>400||bullets[i].pos.x<0||bullets[i].pos.y>400||bullets[i].pos.y<0){
                bullets.splice(i,1);
            }
            }
if (reload>30&&mousePressed&&plife>10||keys[32]&&reload>30&&plife>10){
    bullets.push(new bullet(px+cos(pr)*30,py+sin(pr)*30,pr,launchspeed));
    reload=0;
}
reload+=reloadspeed;
textSize(20);
    fill(255, 42, 0);
textFont(createFont("impact"));
text('$ '+round(money),350,19);
text('Score: '+round(score) + '         '+ round(highscore),78,19);
fill(230, 230, 230);
textFont(createFont("Trebuchet MS Bold"));
    text('P to pause game',236,19);
textFont(createFont("impact"));
if (plife>10){
    if (appear===0){score+=10;}
}
if (highscore<score){
    highscore=score;
}
if (plife<=11){
    scene='shop';
}
};

draw = function (){

    background(59, 47, 47);

switch (scene) {

   case "menu":
            menu();
            break;
        case "how":
            how();
            break;
        case "game":
                if (!pause){game();} else {
                    fill(255, 255, 255);
                    textSize(40);
                    text('Paused',200,200);
textSize(20);
    fill(255, 42, 0);
textFont(createFont("impact"));
text('$ '+round(money),350,19);
text('Score: '+round(score) + '         '+ round(highscore),78,19);
                }
            break;
        case "shop":
                shop();
            break;
}

            if (lightingupscene){
                if (light<240) {
                light+=8;} else {
                    lightfade+=8;
                }
                noStroke();
                fill(0,0,0,light-lightfade);
                rect(300,300,600,600);
            }
             if (light>=240&&lightingupscene){
                 scene=destination;
                 if (scene==='how'){
                    huhs.splice(0,huhs.length);
                    huhs.push(new huh(288,291,30,'p'));
                 }
             }
             if (lightfade>240){
                 lightfade=0;
                 light=0;
                 lightingupscene=false;
             }
};

mouseClicked=function() {
if (reload>30&&plife>10){
    bullets.push(new bullet(px+cos(pr)*30,py+sin(pr)*30,pr,launchspeed));
    reload=0;
}
    if (scene==='menu'&&play.inm()){
        destination='how';
        lightingupscene=true;
    } else if (scene==='how'){
        if (howpage<3&&next.inm()){
            if (howpage===1){
                    huhs.splice(0,huhs.length);
        for (var i=0;i<3;i++){
huhs.push(new huh(random(0,400),0,random(0,180),''));
        }
            }
            howpage++;
        } else if (play.inm()&&howpage===3) {
        destination='game';
        lightingupscene=true;
        reset();
        }
    } else if (scene==='shop'){
        if (buyrpm.inm()&&round(money)>=round(rpmcost)){
            money-=rpmcost;
            reloadspeed*=1.1;
            rpmcost*=1.2;
        }
        if (buyblspeed.inm()&&round(money)>=round(speedcost)){
            money-=speedcost;
            launchspeed+=1;
            speedcost*=1.2;
        }
        if (buyregen.inm()&&round(money)>=round(regencost)){
            money-=regencost;
            regen+=1;
            regencost*=1.2;
        }
        if (buymoney.inm()&&round(money)>=round(moneycost)){
            money-=moneycost;
            moneygain+=0.2;
            moneycost*=1.2;
        }
    if (retry.inm()){
        score=0;
        lightingupscene=true;
        destination='game';
        plife=110;
        huhs.splice(0,huhs.length);
        huhs.push(new huh(0,200,104,'p'));
        for (var i=0;i<3;i++){
huhs.push(new huh(random(0,400),0,random(0,180),''));
        }
    }
    }
};

keyPressed = function() {
    keys[keyCode] = true;
    if (!pause&&keys[80]){
        pause=true;
    } else if (pause&&keys[80]){
        pause=false;
    }
};
keyReleased = function() {
    keys[keyCode] = false;
};
}};


        var canvas = document.getElementById("mycanvas");
        // Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
        var processingInstance = new Processing(canvas, sketchProc);
