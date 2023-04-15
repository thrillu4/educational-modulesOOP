export default class Slider {
    constructor({container = null,
        btns = null,
        next = null,
        prev = null,
        modulesNext = null,
        modulesPrev = null,
        activeClass = '',
        animate,
        autoplay
    } = {}) {
        this.container = document.querySelector(container);
        try {this.slides = this.container.children;} catch (error) {}
        this.btns = document.querySelectorAll(btns);
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.modulesNext = document.querySelectorAll(modulesNext);
        this.modulesPrev = document.querySelectorAll(modulesPrev);
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
        this.slideIndex = 1;
    }
}