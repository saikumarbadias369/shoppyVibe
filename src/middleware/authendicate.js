const jwtProvider = require('../config/jwtProvider.js')
const userService = require('../services/user.services.js')

const authendicate =async (req, res, next) => {
    try {
        console.log(req.headers.authorization)
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).send({ error: 'token not found...' })
        }
        const userId = jwtProvider.getUserIdFromToken(token)

        const user = await userService.findUserById(userId)
        req.user = user
    } catch (error) {
        return res.status(500).send(({ error: error.message }))
    }
    next();
}

module.exports = authendicate 