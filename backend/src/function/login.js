async function login(req, res) {
    try {
        const { username, password } = req.body
        const user = await prisma.user.findFirst({
            where: {
                username: String(username),
                password: String(password)
            }
        })
        if (user === null) {
            res.status(401).json({ message: "password or email incorrect", error: "User not found", })
        }
        else {
            res.json({ user: user })
        }
    }
    catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        })
    }
}

exports.login=login