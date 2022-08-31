var guestdb = require('../model/model');

// create and save new 
exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty" });
        return;  //if user makes a POST request with empty body, it will trigger the above mesage
    }

    // new guest
    const guest = new guestdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })


    //save guest in the mongo database

    guest
        .save(guest)
        .then(data => {
            res.send(data)
            //res.redirect('/add_guest');
        })
        .catch(err => {
            res.status(500).send({
                mesage: err.message || "Some error occurred while saving guest's details"
            });
        });

}




// retrive and return either a single or all guests
//http://localhost:3000/api/guests?id=630fc263afd4832790f412cc  specific guest
//http://localhost:3000/api/guests the list of guests
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        guestdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found guest with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving guest with id " + id})
            })

    }else{
        guestdb.find()
            .then(guest => {
                res.send(guest)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving guest information" })
            })
    }

    
}



    // Update a new idetified guest by guest id
    exports.update = (req, res) => {
        if (!req.body) {
            return res.status(400).send({ message: "Data to update can not be empty" })
        }

        const id = req.params.id;
        guestdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `Cannot update guest's with ${id}. Maybe guest not found!` })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error Update guest info" })
            })
    }

    // Delete a guest with specified guest id in the request
    exports.delete = (req, res) => {
        const id = req.params.id;

        guestdb.findByIdAndDelete(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `Cannot delete the gues with id ${id}. Maybe id is wrong` })
                } else {
                    res.send({
                        message: "Guest was deleted successfully!"
                    })
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete guest with id=" + id
                });
            });
    }