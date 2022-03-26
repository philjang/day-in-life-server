const express = require('express')
const router = express.Router()
const db = require('../../models')
const requiresToken = require('./requiresToken')

// POST /comments -- CREATE a new comment
router.post('/', requiresToken, async (req, res) => {
    try {
        const foundUser = await db.User.findOne({
            'photos._id': req.body.photoId,
        })
        // console.log(foundUser)
        const foundPhoto = foundUser.photos.id(req.body.photoId)
        // console.log(foundPhoto)
        foundPhoto.comments.push(req.body)
        await foundUser.save()
        res.status(201).json(foundUser)
    } catch (err) {
        console.log(err)
        res.status(503).json({ msg: 'database or server error'})
    }
})

// PUT /comments/:id -- UPDATE a comment with :id
router.put('/:id', requiresToken, async (req, res) => {
    try {
        const foundUser = await db.User.findOne({
            'photos._id': req.body.photoId,
        })
        const foundPhoto = foundUser.photos.id(req.body.photoId)
        const foundComment = foundPhoto.comments.id(req.params.id)
        if(res.locals.user.id === foundComment.user_id) {
            foundComment.set(req.body)
            await foundUser.save()
            res.status(200).json(foundUser)
        } else res.json({ msg: 'invalid action' })
    } catch (err) {
        console.log(err)
        res.status(503).json({ msg: 'database or server error'})
    }
})

// DELETE /comments/:id -- DELETE a comment with :id
router.delete('/:id', requiresToken, async (req, res) => {
    try {


    } catch (err) {
        console.log(err)
    }
})

module.exports = router