const $=document.querySelector.bind(document)
  const $$=document.querySelectorAll.bind(document)
  var playlist= $('.playlist')
  var playBtn=$('.btn-toggle-play')
  const heading=$('header h2')
  const cdThumb=$('.cd-thumb')
  const audio=$('#audio')
  const cd=$('.cd')
  const player=$('.player')
  const progress=$('#progress')
  const nextBtn=$('.btn-next')
  const prevBtn=$('.btn-prev')
  const randomBtn=$('.btn-random')
  const repeatBtn=$('.btn-repeat')
  
  const app={
    isRandom:false,
      currentIndex:0,
      isPlaying:false,
      isRepeat:false,
      songs:[
          {
              name:'BomBai',
              singer:'DyRo',
              path:'/assets/music/y2mate.com - Dyro  Bombai.mp3',
              image:'/assets/img/maxresdefault (1).jpg',
          },
          {
              name:'Dreamer (Nicky Romero Remix)',
              singer:'Martin Garrix',
              path:'/assets/music/y2mate.com - Martin Garrix feat Mike Yung  Dreamer Nicky Romero Remix.mp3',
              image:'/assets/img/maxresdefault.jpg',
          },
          {
              name:'Daydreamer (Lyrics / Lyric Video) feat. AMIDY',
              singer:'William Black ',
              path:'/assets/music/y2mate.com - William Black  Daydreamer Lyrics  Lyric Video feat AMIDY.mp3',
              image:'/assets/img/maxresdefault (2).jpg',
          },
          {
              name:'Daily (feat. Jon Becker)',
              singer:'Rival & Cadmium',
              path:'/assets/music/y2mate.com - Rival  Cadmium  Daily feat Jon Becker.mp3',
              image:'/assets/img/maxresdefault (3).jpg',
          },
          {
              name:'Hold On & Believe (feat. The Federal Empire)',
              singer:'Martin Garrix',
              path:'/assets/music/y2mate.com - Martin Garrix Hold On Never Leave Feat Avicii Psycho.mp3',
              image:'/assets/img/abc.jpg',
          },
          {
              name:'Lions In The Wild [Official Video]',
              singer:'Martin Garrix & Third Party',
              path:'/assets/music/y2mate.com - Martin Garrix  Third Party  Lions In The Wild Official Video.mp3',
              image:'/assets/img/maxresdefault (4).jpg',
          },
          {
              name:'Play Hard ft. Ne-Yo, Akon (Official Video)',
              singer:'David Guetta',
              path:'/assets/music/y2mate.com - David Guetta  Play Hard ft NeYo Akon Official Video.mp3',
              image:'/assets/img/abcd.jpg',
          },
          {
              name:'Waiting For Love',
              singer:'Avicii ',
              path:'/assets/music/y2mate.com - Avicii  Waiting For Love.mp3',
              image:'/assets/img/maxresdefault (5).jpg',
          },
          {
              name:' Pizza vs. You Got The Love vs. I Wanna Dance With Somebody (WeDamnz Mashup)',
              singer:'Martin Garrix',
              path:'/assets/music/y2mate.com - Martin Garrix  Pizza vs You Got The Love vs I Wanna Dance With Somebody WeDamnz Mashup.mp3',
              image:'/assets/img/maxresdefault (6).jpg',
  
  
          }
      ],
      render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="thumb" style="background-image: url('${song.image}');"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class= "fas fa-ellipsis-h"></i>
                </div>
            </div>
        `
        })
        playlist.innerHTML = htmls.join('')
    },
    
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    
    handleEvents: function() {
        const _this=this
        const cdWidth = cd.offsetWidth
    
    
        // Xử lý CD quay / dừng
        const cdThumbAnimate = cdThumb.animate([{ 
            transform: "rotate(360deg)"
        }], { 
            duration:  10000,
            iterations: Infinity
        });
        cdThumbAnimate.pause()
    
    
        // Xử lý phóng to / thu nhỏ CD
        document.onscroll=function(){
           
            const scrollTop= window.scrollY
            const newcdWidth= cdWidth-scrollTop
            cd.style.width=newcdWidth+'px'
            cd.style.opacity=newcdWidth/cdWidth
        }
    
         // Xử lý khi click play 
         playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }
        // Khi song được play
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        }
        // Khi song bị pause
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }
        // Xử lý thanh âm lượng khi có sự thay đổi trên thanh điều khiển âm thanh
        
    
        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if (audio.duration) {
              const progressPercent = Math.floor(
                (audio.currentTime / audio.duration) * 100
              );
              progress.value = progressPercent;
            }
          };
        // Xử lý khi tua bài hát
        progress.onchange= function(e){
            const seekTime=e.target.value/100*audio.duration
            audio.currentTime=seekTime

        }
        // Xử ký điều chỉnh thanh thông báo khi màn hình co nhỏ
        
        // Xử lý tắt thanh thông báo trên dashboard
       
      
        // Xử lý bật / tắt Random
        randomBtn.onclick = function (e) {
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle("active", _this.isRandom);

          };
        // Khi next song
        nextBtn.onclick = ()=>{
            if (this.isRandom) {
               this.playRandomSong()
            } else {
               this.nextSong()
            }
            audio.play()
           this.render()
        
            
        }
        // Khi prev bài hát
        prevBtn.onclick = ()=>{
            if (this.isRandom) {
               this.playRandomSong()
            } else {
               this.prevSong()
            }
           audio.play()
           this.render()
           
        }
        
    
        // Xử lý tua lại từ đầu 1 bài hát
       repeatBtn.onclick=(e)=>{
        this.isRepeat= !this.isRepeat
        repeatBtn.classList.toggle("active", this.repeatBtn);
        if(this.isRepeat){
            this.playRepeatSong()
        }

       }
        // Next khi hết nhạc 
      audio.onended=()=>{
        nextBtn.click()
      }
        // Lắng nghe hành vi click vào playlist
    playlist.onclick=(e)=>{
        const songNode=e.target.closest('.song:not(.active)')
        if(songNode){
            this.currentIndex=Number(songNode.dataset.index)
            this.loadCurrentSong()
            this.render()
            audio.play()
        }
    }
    

    },
    scrollToActiveSong: function () {
        setTimeout(() => {
          $(".song.active").scrollIntoView({
            behavior: "smooth",
            block: "nearest"
          });
        }, 300);
      },
    nextSong: function() {
        this.currentIndex++
        if (this.currentIndex>=this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    
    prevSong: function() {
        this.currentIndex--
        if (this.currentIndex< 0) {
            this.currentIndex = this.songs.length -1 
        }
        this.loadCurrentSong()
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    playRandomSong: function () {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);
    
        this.currentIndex = newIndex;
        this.loadCurrentSong();
      },
    playRepeatSong:function(){
        audio.onended=()=>{
            this.loadCurrentSong()
            audio.play()
        }
    },

    
    
    
    
    
    
    start: function() {
        // Gán cấu hình config vào app
       
        // Định nghĩa các thuộc tính cho Object
        this.defineProperties()
    
    
    
        // Lắng nghe và xử lý các sự kiện (DOM event)
        this.handleEvents()
    
    
        // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong() 
    
    
        // Render playlist
        this.render()
    
        // Hiển thị trạng thái ban đầu của btn repeat và random
       
    }
    }
    
    app.start()