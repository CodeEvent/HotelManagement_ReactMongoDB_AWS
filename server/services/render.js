const axios = require('axios');



exports.homeRoutes= (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/guests')
    .then(function(response){
    res.render("index",{guests:response.data});
})
    .catch(err =>{
        res.send(err)
    })
}
exports.add_guest = (req,res) => {
    res.render("add_guest");
}

exports.update_guest = (req,res) => {
    res.render("update_guest");
}