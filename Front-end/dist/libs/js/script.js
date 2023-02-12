import controller from './Controllers/Controller.js';
window.onload = async () => {
    await controller.initApplication().catch((err) => console.log(err));
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hide');
    }, 1000);
};
//# sourceMappingURL=script.js.map