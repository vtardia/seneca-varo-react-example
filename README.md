![Seneca](http://senecajs.org/files/assets/seneca-logo.png)

# Seneca/Varo React Example

This repo contains an example application written using [Seneca][senecajs] on the server and [Varo][varo] on the frontend. It is a port of the [official React Tutorial][tutorial] re-written in ES6. It uses a [Flux-style][flux] messaging system with a custom dispatcher built on top of [Varo][varo], and a RESTful backend written in [Seneca][senecajs].

 - __Lead Maintainer:__ [Vito Tardia][lead]
 - __Sponsor:__ [nearForm][]

## Running

To run the project you need [Gulp][gulp], Node.js and npm.

 1. Run `npm install --global gulp` to install Gulp globally
 2. Run `npm install` to install all dependencies
 3. Run `npm run build` to create a deploy
 4. Run `npm start` to serve the app on port `3000`  

If you want to experiment with the code you can run `gulp watch` on another shell and enjoy live editing.

## Contributing
The [Senecajs org][senecajs] encourages open participation. If you feel you can help in any way, be it with
documentation, examples, extra testing, or new features please get in touch.

## License
Copyright (c) 2015, Vito Tardia and other contributors.
Licensed under [MIT][].

[tutorial]: https://facebook.github.io/react/docs/tutorial.html
[varo]: https://www.npmjs.com/package/varo
[senecajs]: http://senecajs.org
[flux]: https://facebook.github.io/flux/docs/overview.html
[lead]: http://vito.tardia.me
[nearForm]: http://www.nearform.com/
[gulpjs]: http://gulpjs.com
[MIT]: ./LICENSE
