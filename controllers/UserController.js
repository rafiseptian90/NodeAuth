exports.allAccess = (req, res) => {
    res.send({ message: 'All access granted' })
}

exports.userAccess = (req, res) => {
    res.send({ message: 'User access granted' })
}

exports.moderatorAccess = (req, res) => {
    res.send({ message: 'Moderator access granted' })
}

exports.adminAccess = (req, res) => {
    res.send({ message: 'Admin access granted' })
}