Baxter (web app)
=============

##In development

You can probably tell Baxter isn't ready yet. Watch this repo or follow [@W0lftron](https://twitter.com/W0lftron) for updates!

##About

The Baxter app is designed to interface with one or more [Electric Imp](http://electricimp.com) clients running [Baxter imp](https://github.com/thure/baxter-imp).

##Installation

1. Add a mongodb user for Baxter and change config.js accordingly.

1. Run `yeoman init` while in the `front` directory. (Install [yeoman](http://yeoman.io) if you don't have it.)

1. Change the extension of `index.html` in `front/dist/` to `.ejs`. (Sorry, I'll add this to a better build file in the future.)

1. Remove `dist` from `.gitignore` in the `front` directory if you plan on committing with git.

1. **Deploy!** Make sure the `dist` directory makes it to your deployment! You can ignore the `temp` directory.

##License

Baxter, both app and imp, are themselves released under the [MIT license](http://bureaujs.org/license).
All of Baxter's dependencies are open source, but have their own licenses.

As a reminder, it's not Baxter's fault if your implementation of Baxter causes problems with your landlord or building manager. Read your lease carefully before installing anything!