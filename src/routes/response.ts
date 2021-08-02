const answer = function(req, res, status, data) {
    res.status(status).send(data)
}

export {answer}