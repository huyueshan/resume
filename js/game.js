$(function(){
	let isfrist=true;
	function initial(){
		let ctx=$("#canvas")[0].getContext('2d');
		ctx.fillStyle="#484848";
		let WIDTH=390, HEIGHT=620;
		let score=0, life=3, state=0, rate=3, endTime=0;
		let bullets=[];
		let enemys=[];
		let ufo1=null,ufo2=null;
		let StartInterVal;
		let bg=new Image();
		bg.src='./images/game_img/background.png';
		let copyright=new Image();
		copyright.src='./images/game_img/shoot_copyright.png';
		let loading=[];
		FZ(loading,"./images/game_img/game_loading",4);
		let heroImg=[];
		heroImg[0]=[];
		FZ(heroImg[0],"./images/game_img/hero",2);
		heroImg[1]=[];
		FZ(heroImg[1],"./images/game_img/hero_blowup_n",4);
		heroImg[2]=[];
		FZ(heroImg[2],"./images/game_img/hero_protect_disapper_n",3);
		heroImg[3]=[];
		FZ(heroImg[3],"./images/game_img/hero_protect",2);
		let bulletImg=[];
		FZ(bulletImg,"./images/game_img/bullet",2);
		let enemyImg=[];
		FZ(enemyImg,"./images/game_img/enemy",1);
		enemyImg[1]=[];
		FZ(enemyImg[1],"./images/game_img/enemy1_down",5);
		enemyImg[2]=[];
		enemyImg[2][0]=new Image();
		enemyImg[2][0].src='./images/game_img/enemy2.png';
		enemyImg[2][1]=new Image();
		enemyImg[2][1].src='./images/game_img/enemy2_hit.png';
		enemyImg[3]=[];
		FZ(enemyImg[3],"./images/game_img/enemy2_down",4);
		enemyImg[4]=[];
		FZ(enemyImg[4],"./images/game_img/enemy3_n",2);
		enemyImg[5]=[];
		enemyImg[5][0]=new Image();
		enemyImg[5][0].src='./images/game_img/enemy3_hit.png';
		enemyImg[6]=[];
		FZ(enemyImg[6],"./images/game_img/enemy3_down",6);
		let ufoImg=[];
		FZ(ufoImg,"./images/game_img/ufo",2);
		function FZ(array,str,n){
			for(let i=0;i<n;i++){
				let c=i+1;
				array[i]=new Image();
				array[i].src=str+c+".png";
			}
		}
		let SKY={image:bg,width:WIDTH, height:HEIGHT,speed:20};
		let LOAD={image:loading,width:186,height:38,x:0,y:HEIGHT-38,speed:100};
		let HERO1={image:heroImg[0],downImg:heroImg[1],width:99,height:124,life:3,speed:30,shotSpeed:200,showSpeed:300};
		HERO2={image:heroImg[3],downImg:heroImg[2],width:204,height:174,life:3,speed:30,shotSpeed:200,showSpeed:300};
		HERO=HERO1;
		let BULLET1={image:bulletImg[0],width:9,height:21,life:1,speed:2};
		let BULLET2={image:bulletImg[1],width:9,height:21,life:1,speed:4};
		let BULLET=BULLET1;
		let ENEMY1={image:enemyImg[0],hidImg:enemyImg[0],downImg:enemyImg[1] ,width:57,height:51,life:1,score:1,speed:500,showSpeed:100};
		let ENEMY2={image:enemyImg[2][0],hidImg:enemyImg[2][1],downImg:enemyImg[3],width:69,height:95,life:6,score:6,speed:800,showSpeed:100};
		let ENEMY3={image:enemyImg[4],hidImg:enemyImg[5][0],downImg:enemyImg[6],width:169,height:258,life:20,speed:4000,score:20,showSpeed:100};
		let UFO1={image:ufoImg[0],type:1,width:58,height:88};
		let UFO2={image:ufoImg[1],type:2,width:60,height:107};
		//构造功能
		let Ufo=function(config){
			this.image=config.image;
			this.width=config.width;
			this.height=config.width;
			this.type=config.type;
			this.x=Math.floor(Math.random()*(WIDTH-this.width));
			this.y=-this.height;
			this.hit=function(config){
				if(!this.canDown&&!config.canDown){
					let EX=config.x;
					let EY=config.y;
					let CLX=this.x-(config.width*9/10);
					let CRX=this.x+this.width-(config.width/10);
					let CTY=this.y-(config.height*8/10);
					let CBY=this.y+this.height;
					let result=CLX<EX && CRX>EX && CTY<EY && CBY>EY;
					return result
				}
			};
			this.move=function(){
				this.y+=3;
			};
			this.paint=function(ctx){
				ctx.drawImage(this.image,this.x,this.y)
			}
		};
		let Enemy=function(config){
			this.image=config.image;
			this.hidImg=config.hidImg;
			this.downImg=config.downImg;
			this.width=config.width;
			this.height=config.height;
			this.life=config.life;
			this.score=config.score;
			this.speed=config.speed;
			this.showSpeed=config.showSpeed;
			this.canDown=false;
			this.cancel=false;
			this.downNum=0;
			this.x=Math.floor(Math.random()*(WIDTH-this.width+1));
			this.y=-this.height;
			this.lastTime=0;
			let NUM=0;
			this.move=function(){
				this.y+=1000/this.speed
			};
			this.paint=function(ctx){
				if(this.canDown){
					let currentTime=new Date().getTime();
						if(currentTime-this.lastTime>=this.showSpeed){
							this.img=this.downImg[this.downNum];
							this.downNum++;
							this.lastTime=new Date().getTime();
							if(this.downNum>=this.downImg.length){
								this.cancel=true;
							}
						}
				}else{
					if(this.life<this.score/2&&this.life>0){
						this.img=this.hidImg;
					}else{
						if(this.image.length){
								let currentTime=new Date().getTime();
								if(currentTime-this.lastTime>=this.showSpeed){
									this.img=this.image[NUM];
									NUM++;
									this.lastTime=new Date().getTime();
									if(NUM>=this.image.length){
										NUM=0;
									}
								}
							} else {
								this.img=this.image;
							}
					}
				}
				if(this.img)
				ctx.drawImage(this.img,this.x,this.y);
			};
			this.hit=function(config){
				if(!this.canDown&&!config.canDown){
					let EX=config.x;
					let EY=config.y;
					let CLX=this.x-(config.width*9/10);
					let CRX=this.x+this.width-(config.width/10);
					let CTY=this.y-(config.height*8/10);
					let CBY=this.y+this.height-(config.height*8/10);
					let result=CLX<EX && CRX>EX && CTY<EY && CBY>EY;
					return result
				}
			}
		};
		let Bullet=function(config,x,y){
			this.width=config.width;
			this.height=config.height;
			this.image=config.image;
			this.speed=config.speed;
			this.life=config.life;
			this.x=x;
			this.y=y;
			this.move=function(){
				this.y-=this.speed;
			};
			this.paint=function(ctx){
				ctx.drawImage(this.image,this.x,this.y);
			}
		};
		let Hero=function(config){
			this.image=config.image;
			this.width=config.width;
			this.height=config.height;
			this.speed=config.speed;
			this.showSpeed=config.showSpeed;
			this.downImg=config.downImg;
			this.canDown=false;
			this.cancel=false;
			this.protect=false;
			this.downNum=0;
			this.index=0;
			this.lastTime=0;
			this.lastTimeD=0;
			this.x=(WIDTH-this.width)/2;
			this.y=HEIGHT-this.height;
			this.step=function(ctx){
				let currentTime=new Date().getTime();
				if(this.canDown){
					if(currentTime-this.lastTimeD>=this.showSpeed){
						this.img=this.downImg[this.downNum];
						this.downNum++;
						this.lastTimeD=new Date().getTime();
					}
					if(this.downNum>=this.downImg.length){
						if(hero.protect){
							let X1=hero.x;
							let Y1=hero.y;
							HERO=HERO1;
							hero=new Hero(HERO);
							hero.x=X1+52;
							hero.y=Y1+25;
						}else if(life>1){
							life--;
							hero=new Hero(HERO);
							BULLET=BULLET1;
							hero.shotSpeed=200;
						}else{
							life--;
							this.cancel=true;
						}
					}
				}else{
					if(currentTime-this.lastTime>=this.speed){
						this.img=this.image[this.index];
						this.index++;
						this.lastTime=new Date().getTime();
					}
					if(this.index>=this.image.length){
						this.index=0;
					}
				}
				if(this.img) ctx.drawImage(this.img,this.x,this.y);
			};
			this.paint=function(ctx){
				if(this.img)
				ctx.drawImage(this.img,this.x,this.y);
			};
			this.shotlastTime=0;
			this.shotSpeed=config.shotSpeed;
			this.shot=function(){
				let currentTime=new Date().getTime();
				if(currentTime-this.shotlastTime>=this.shotSpeed){
					let bullet= new Bullet(BULLET,this.x+(this.width-BULLET.width)/2,this.y-BULLET.height);
					this.shotlastTime=new Date().getTime();
					bullets[bullets.length]=bullet;
				}
			};
			this.enemyLastTime=0;
			let enemyOutSpeed=this.shotSpeed;
			let enemyState=0;
			this.enemyShow=function(){
				let currentTime=new Date().getTime();
				enemyOutSpeed=Math.floor(Math.random()*this.shotSpeed*100+(this.shotSpeed*rate));
				if (currentTime-this.enemyLastTime>=enemyOutSpeed){
					enemyState=Math.floor(Math.random()*30+1);
					if(enemyState<20){
						enemys[enemys.length]=new Enemy(ENEMY1);
					} else if(enemyState<=29){
						enemys[enemys.length]=new Enemy(ENEMY2);
					}else{
						enemys[enemys.length]=new Enemy(ENEMY3);
					}
					this.enemyLastTime=new Date().getTime();
				}
			};
			this.ufo1LastTime=new Date().getTime();
			this.ufo2LastTime=new Date().getTime();
			this.ufoShow=function(){
				this.ufo1Speed=Math.floor(Math.random()*this.shotSpeed*700+this.shotSpeed*70);
				this.ufo2Speed=Math.floor(Math.random()*this.shotSpeed*600+this.shotSpeed*60);
				let currentTime=new Date().getTime();
				if(currentTime-this.ufo1LastTime>=this.ufo1Speed){
					ufo1=new Ufo(UFO1);
					this.ufo1LastTime=new Date().getTime();
				}
				if(currentTime-this.ufo2LastTime>=this.ufo2Speed){
					ufo2=new Ufo(UFO2);
					this.ufo2LastTime=new Date().getTime();
				}
			}
		};
		let Load=function(config){
			this.lastTime=0;
			this.index=0;
			this.step=function(){
				let currentTime=new Date().getTime();
				if(currentTime-this.lastTime>=config.speed){
					this.image=config.image[this.index];
					this.index++;
					this.lastTime=new Date().getTime();
					if(this.index>=config.image.length){
						state=2;
					}
				}
			};
			this.paint=function(ctx){
				if(this.image) ctx.drawImage(this.image,config.x,config.y);
			}
		};
		let Sky=function(config){
			this.bg=config.image;
			this.width=config.width;
			this.height=config.height;
			this.speed=config.speed;
			this.x1=0;
			this.y1=0;
			this.x2=0;
			this.y2=-this.height;
			this.lastTime=0;
			this.step=function(){
				let currentTime=new Date().getTime();
				if(currentTime-this.lastTime>=this.speed){
					this.y1++;
					this.y2++;
					this.lastTime=new Date().getTime();
				}
				if (this.y1>=this.height){
					this.y1=-this.height
				}
				if (this.y2>=this.height){
					this.y2=-this.height
				}
			};
			this.paint=function(ctx){
				ctx.drawImage(this.bg,this.x1,this.y1,this.width,this.height);
				ctx.drawImage(this.bg,this.x2,this.y2,this.width,this.height);
			}
		};
		let sky=new Sky(SKY);
		let load=new Load(LOAD);
		let hero=new Hero(HERO);
		$('canvas').on('click',load_click);
		$('canvas').on('mousemove',hero_move);
		function load_click(){
			if(state==0||state==4){
				state=1;
			}
			if(state==2){
				if(hero.protect){
					for(let i=0;i<enemys.length;i++){
						enemys[i].canDown=true;
						score+=enemys[i].score;
						hero.canDown=true;
					}
				}
			}
		}
		function deleteComponent(){
			for (let i=0;i<enemys.length ;i++ ){
				if(enemys[i].cancel){
						enemys.splice(i,1);
				}
			}
			if(hero.cancel){
				state=3;
			}
		}
		function downComponent(){
			if(ufo1){
				if(ufo1.hit(hero)){
					BULLET=BULLET2;
					hero.shotSpeed=150;
					ufo1=null;
				}
			}
			if(ufo2){
				if(ufo2.hit(hero)){
					if(!hero.protect){
						let X2=hero.x;
						let Y2=hero.y;
						HERO=HERO2;
						hero=new Hero(HERO);
						hero.x=X2-52;
						hero.y=Y2-25;
						hero.protect=true;
					}
					ufo2=null;
				}
			}
			for (let i=0;i<enemys.length ;i++ ){
				for(let b=0;b<bullets.length;b++){
					if(enemys[i].hit(bullets[b])){
							bullets.splice(b,1);
						enemys[i].life--;
						if(enemys[i].life<=0){
							enemys[i].canDown=true;
							score+=enemys[i].score;
							if(rate>0){
								if(score>=100){
									rate-=Math.floor(score/100);
								}
							}
						}
					}
				}
			}
			for (let h=0;h<enemys.length ;h++ ){
				if(enemys[h].hit(hero)){
					if(hero.protect){
						let X1=hero.x;
						let Y1=hero.y;
						HERO=HERO1;
						hero=new Hero(HERO);
						hero.x=X1+52;
						hero.y=Y1+25;
					}else{
						hero.canDown=true;
						enemys[h].canDown=true;
					}
				}
			}
		}
		function paintComponent(){
			for (let i=0; i<bullets.length;i++ ){
				bullets[i].paint(ctx);
				}
			for(let n=0;n<enemys.length;n++){
				enemys[n].paint(ctx);
			}
			ctx.font='20px 微软雅黑';
			ctx.fillText('SCORE:'+score,10,20);
			ctx.fillText('LIFE:'+life,WIDTH-64,20);
			if(ufo1){
				ufo1.paint(ctx);
			}
			if(ufo2){
				ufo2.paint(ctx);
			}
		}
		function moveAll(){
			if(ufo1){
				ufo1.move();
				if(ufo1.y>HEIGHT){
					Ufo1=null;
				}
			}
			if(ufo2){
				ufo2.move();
				if(ufo2.y>HEIGHT){
					Ufo2=null;
				}
			}
			for (let i=0; i<bullets.length;i++ ){
				bullets[i].move();
				if (bullets[i].y<0){
					bullets.splice(i,1)
				}
			}
			for(let n=0;n<enemys.length;n++){
				enemys[n].move();
				if(enemys[n].y>HEIGHT){
						enemys.splice(n,1)
				}
			}
		}
		function hero_move(e){
			if(state==2){
				hero.x=e.offsetX-HERO.width/2;
				hero.y=e.offsetY-HERO.height/2;
			}
		}
		let play=function() {
			let width=0;
			let str=isfrist?"点击开始":"再玩一次";
			StartInterVal=setInterval(function () {
				sky.step();
				sky.paint(ctx);//背景滚动图
				switch (state) {
					case 0:
						ctx.drawImage(copyright, (WIDTH - copyright.width) / 2, 150);
						ctx.font = "bold 52px 微软雅黑";
						width = ctx.measureText(str).width;
						ctx.fillText(str, (WIDTH - width) / 2, 560);
						break;
					case 1:
						load.step();
						load.paint(ctx);
						break;
					case 2:
						hero.step(ctx);
						hero.shot();
						hero.enemyShow();
						hero.ufoShow();
						moveAll();
						paintComponent();
						downComponent();
						deleteComponent();
						// test();
						break;
					case 3:
						moveAll();
						paintComponent();
						ctx.font = "bold 36px Arial";
						width = ctx.measureText("得分："+score).width;
						ctx.fillText("得分："+score, (WIDTH - width) / 2, 180);
						ctx.font = "bold 58px Arial";
						width = ctx.measureText("GAME_OVER").width;
						ctx.fillText("GAME_OVER", (WIDTH - width) / 2, 350);
						endGame();
						break;
				}
			}, 1000 / 100);
		};
	function endGame(){
		if(endTime<600){
			endTime++;
		}else{
			clearInterval(StartInterVal);
			state=4;
			isfrist=false;
			initial();
		}
	}
	play();
	}
	window.addEventListener('load',initial,false);
});




