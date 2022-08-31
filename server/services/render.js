exports.homeRoutes= (req, res) => {
    res.render("index");
}

exports.add_guest = (req,res) => {
    res.render("add_guest");
}

exports.update_guest = (req,res) => {
    res.render("update_guest");
}