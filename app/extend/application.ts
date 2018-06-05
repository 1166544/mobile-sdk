export default {
    get foo() {
        return 'hi';
    },

    set foo(arg) {
        arg = arg + '';
        // hole
    },
};
