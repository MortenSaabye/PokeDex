const express = require('express')
const fetch = require('node-fetch');
const router = express.Router()
const mongo = require('mongodb').MongoClient

const url = "mongodb://MortenSaabye:OWuJbPiJ3NlCVUjc@cluster0-shard-00-00-kw2pz.mongodb.net:27017,cluster0-shard-00-01-kw2pz.mongodb.net:27017,cluster0-shard-00-02-kw2pz.mongodb.net:27017/pokemon?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"


router.route('/')
   .get((req, res) => {
      mongo.connect(url, (err, db) => {
         const collection = db.collection('species')
         collection.findOne({}, (err, species) => {
            res.json(species)
         })
      })
   })
router.route('/:pokemon')
   .get((req, res) => {
      const pokemon = req.params.pokemon
      mongo.connect(url, (err, db) => {
         const collection = db.collection('pokemon')
         collection.findOne({name: pokemon}, (err, pokemon) => {
            res.send(pokemon)
         })
      })
   })

router.route('/addpokemon')
   .get((req, res) => {
      let id = 1
      res.send('adding books')
      mongo.connect(url, (err, db) => {
         const collection = db.collection('pokemon')
         
         function fetchPokemon(id) {
            fetch(`http://pokeapi.co/api/v2/pokemon/${id}`)
               .then(response => response.json())
               .then(response => {
                  collection.insertOne(response, (err, results) => {
                     console.log(`added ${id} pokemon`)
                     if (id >= 151) {
                        console.log('done')
                        db.close()
                     } else {
                        id++
                        fetchPokemon(id)
                     }
                  })
               })
         }
         if (id === 1) {
            fetchPokemon(id)
         }
      })
   })

module.exports = router
