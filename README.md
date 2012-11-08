Baxter (web app)
=============

##In development

You can probably tell Baxter isn't ready yet. Watch this repo or follow [@W0lftron](https://twitter.com/W0lftron) for updates!

##About

The Baxter app is designed to interface with one or more [Electric Imp](http://electricimp.com) clients running [Baxter imp](https://github.com/thure/baxter-imp), your modifications thereof, or your own software & hardware.

Baxter app is designed to let you and your authorized users control low-level devices that have HTTP endpoints, such as the Electric Imp.
Baxter runs on node.js and can be easily deployed to [node hosting services](https://github.com/joyent/node/wiki/Node-Hosting).

Implementation isn't complete, but soon you'll be able to set-up Baxter, add devices and users, and start programming your way to home automation!
Upcoming features include:

+ Scheduling times when users can use particular functions of a device
+ An interactive planner that sets up all the right endpoints for complex devices.
+ OAuth v2 provision and logging in from other OAuth providers like Facebook and GitHub.

##Installation

1. Add a mongodb user for Baxter and change `config.js` accordingly. Currently there is no CRUD for imps or users, so you'll have to add those manually.

1. Add email credentials to `config.js`. You should consider giving Baxter its own email address so you can take full advantage of [IFTTT](http://ifttt.com)'s features.

1. Run `yeoman init` while in the `front` directory. (Install [yeoman](http://yeoman.io) if you don't have it.)

1. Change the extension of `index.html` in `front/dist/` to `.ejs`. (Sorry, I'll add this to a better build file in the future.)

1. Remove `dist` from `.gitignore` in the `front` directory if you plan on committing with git.

1. **Deploy!** Make sure the `front/dist` directory makes it to your deployment! You can ignore the `front/temp` directory.

##License

Baxter, both app and imp, are themselves released under the [MIT license](http://bureaujs.org/license).
All of Baxter's dependencies are open source, but have their own licenses.

##The not-so-fine print you should read

As a reminder, Baxter isn't liable if your implementation causes problems with your landlord or building. Read your lease carefully before hacking your home!

Take advantage of Baxter's phoning-home features (in `care.js` and described in Baxter-imp) – it'll help keep you abreast of your imps' statuses and help keep your imps awake at all times (in cases where they need to be).

Beware! Passwords are currently only passed in plaintext. Use passwords you don't care about until encryption is implemented. Using HTTPS is always recommended.