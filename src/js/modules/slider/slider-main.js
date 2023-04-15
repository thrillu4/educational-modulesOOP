import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor(btns, modulesNext, modulesPrev) {
        super(btns, modulesNext, modulesPrev);
    }
    showSlides(n) {
        if(n > this.slides.length) {
            this.slideIndex = 1
        }

        if(n < 1) {
            this.slideIndex = this.slides.length
        }

        try {
            this.teacher.style.opacity = '0'
            if(n === 3) {
                this.teacher.classList.add('animated');
                setTimeout(() => {
                    this.teacher.style.opacity = '1';
                    this.teacher.classList.add('slideInUp');
                }, 4000)
            } else {
                this.teacher.classList.remove('slideInUp');
            }
        } catch (e) {}

        

        this.slides.forEach(slide => {
            slide.style.display = 'none'
        });

        this.slides[this.slideIndex - 1].style.display = 'block';
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n)
    }

    bindTriggers(modules, n) {
        modules.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.plusSlides(n)
            })
        })

        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.plusSlides(1);
            })
            btn.parentNode.previousElementSibling.addEventListener('click', () => {
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            })
        })
    }

    render() {
        if (this.container) {
            try {
                this.teacher = document.querySelector('.hanson');
                } catch (e) {}
            
            this.showSlides(this.slideIndex);
            this.bindTriggers(this.modulesNext, 1);
            this.bindTriggers(this.modulesPrev, -1);
        }
    }
}