
const testController = (req,res) => {
    try {
        res.status(200).send("<h1>Welcome to the server</h1>")
    } catch (error) {
        console.log("error in  Api",error)
        
    }

}

module.exports = {testController}
