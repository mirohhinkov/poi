class Listeners {
    createPoiHandler(event) {
        event.preventDefault();
        const form = event.target;
        const inputTextFields = Array.from(form.getElementsByTagName('input'));
        inputTextFields.length = 9;
        const poiFielsd = inputTextFields.map((el) => /^-?\d+$/.test(el.value) || /^\d+\.\d+$/.test(el.value)
            ? +el.value
            : el.value);
        console.log(poiFielsd);
    }
}
export default new Listeners();
//# sourceMappingURL=Listeners.js.map