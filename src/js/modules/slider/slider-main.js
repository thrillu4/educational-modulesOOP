import Slider from "../slider";

export default class MainSlider extends Slider {
    constructor(page, btns) {
        super(page, btns);
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

    render() {
            try {
                this.teacher = document.querySelector('.hanson');
            } catch (e) {}
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.plusSlides(1);
            })
            btn.parentNode.previousElementSibling.addEventListener('click', () => {
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            })
        })
        this.showSlides(this.slideIndex);
    }
}