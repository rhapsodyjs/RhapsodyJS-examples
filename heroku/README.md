# Deploy RhapsodyJS app to Heroku

To deploy a RhapsodyJS app to Heroku is really easy, you just need to:

* Change your port (in the environment configuration file) to `process.env.PORT`, so RhapsodyJS will take the Heroku port
* Create a `Procfile`, with the command `web: node ./app.js`

After that, you can deploy it normally like any Heroku app ! =)

You can see it running here [http://heroku-rhapsody.herokuapp.com/](http://heroku-rhapsody.herokuapp.com/)