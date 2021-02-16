class Lightbox {
    constructor(options) {
        this.targets = typeof options.targets === 'string' ? document.querySelectorAll(options.targets) : options.targets;
        this.showTargets
    }

    showTargets() {
        console.log(this.targets)
    }
}