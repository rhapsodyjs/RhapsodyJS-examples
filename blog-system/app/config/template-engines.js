module.exports = {
  defaultEngine: 'hjs',

  /**
   * The default view engine can be any of:
   * https://github.com/visionmedia/consolidate.js/#supported-template-engines
   *
   * Must follow the pattern:
   *
   * name: {
   *   extension: extension
   *   lib: lib-that-renders-the-extension
   * }
   */

  engines: {
    //Due to problems with Consolidate, I needed to set it directly, check the config/bootstrap.js file
    // hogan: {
    //   extension: 'hjs',
    //   lib: require('hogan-express')
    // }
  }
};