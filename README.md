# Breakout Tutorial

A _Breakout_ clone tutorial. Learn how to create games using [Good
Luck](https://github.com/piesku/goodluck).

## Getting Started

1. [Create a new repository](https://github.com/piesku/breakout/generate)
   using this repo as a template.
2. Clone the newly created repository.
3. `npm install` the build tools.
4. `npm start` the development server.

## Editor Setup

For best experience, use VS Code with the following extensions:

- [Debugger for Chrome](https://code.visualstudio.com/blogs/2016/02/23/introducing-chrome-debugger-for-vs-code),
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

Rather than start the development server from your terminal, we recommend to
start it from VS Code through `Terminal > Run build task…` or
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>. VS Code will integrate the
output of the TypeScript compilation into the editor window.

Then run the project through `Debug > Start Debugging` or press <kbd>F5</kbd>.


## Following the Tutorial

Follow the commits on the
[tutorial](https://github.com/piesku/breakout/tree/tutorial) branch.

## End Result

See https://piesku.github.io/breakout/ for the completed game which you will
have created by the end of this tutorial too!

## Optimized Builds

Production builds are bundled into a single `.js` file and optimized for
size. They are suitable for deployment. You can find them in `public/opt`. To
build them, run:

1. `make`
