'use strict'

const express = require('express')
const router = express.Router()
const Trips = require('../models/Trips.js')

/* /api/trips */
router.get('/api/trips', function (req, res, next) {
  Trips.find(function (err, trips) {
    if (err) return next(err)
    res.json(trips)
  })
})

router.post('/api/trips', function (req, res, next) {
  Trips.create(req.body, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

/* /api/trips/:id */
router.get('/api/trips/:id', function (req, res, next) {
  Trips.find({owner_id: req.params.id}, function (err, trips) {
    if (err) return next(err)
    res.json(trips)
  })
})

router.delete('/api/trips/:id', function (req, res, next) {
  Trips.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

router.put('/api/trips/:id', function (req, res, next) {
  Trips.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

module.exports = router
