import "@testing-library/jest-dom/extend-expect"
window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
};
jest.mock('next/router', () => require('next-router-mock'));