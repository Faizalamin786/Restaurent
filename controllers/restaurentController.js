const resturantModel = require("../Models/resturentModel");

//create Resturant
const createRestaurentController =async (req,res)=>{
    try {
        const {
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
          } = req.body;

          if(!title||!coords){
            return res.status(500).send({
                success: false,
                message: ('Please provide title and address')
            })
          }
          const newRestaurent = new resturantModel({
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
          })
          await newRestaurent.save();
          res.status(201).send({
            success:true,
            message:"New Restaurent completed successfully"
          })
        
    } catch (error) {
        console.log(error);
        res.status({
            success: false,
            message: "error in createing restaurent api",
            error
        })
        
    }

}
//get all restaurent
const getAllRestaurentController = async(req, res) => {
    try {
        const restaurant = await resturantModel.find({})
        if(!restaurant){
            return res.status(404).send({
                success: false,
                message: "no restaurant available"
            })

        }
        res.status(200).send({
            success: true,
            totalCount:restaurant.length,
            restaurant
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:"Error in getting rastaurent API",
            error
        })
    }

}
//get by ID restaurent controller
const getAllResturantController = async (req, res) => {
    try {
      const resturants = await resturantModel.find({});
      if (!resturants) {
        return res.status(404).send({
          success: false,
          message: "No Resturant Availible",
        });
      }
      res.status(200).send({
        success: true,
        totalCount: resturants.length,
        resturants,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Get ALL Resturat API",
        error,
      });
    }
  };
  
  // GET RESTURNAT BY ID
  const getByidRestaurentController = async (req, res) => {
    try {
      const resturantId = req.params.id;
      if (!resturantId) {
        return res.status(404).send({
          success: false,
          message: "Please Provide Resturnat ID",
        });
      }
      //find resturant
      const resturant = await resturantModel.findById(resturantId);
      if (!resturant) {
        return res.status(404).send({
          success: false,
          message: "no resturant found",
        });
      }
      res.status(200).send({
        success: true,
        resturant,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Get Resturarnt by id api",
        error,
      });
    }
  };
  //delete restaurent
  const deleteResturantController = async (req, res) => {
    try {
      const resturantId = req.params.id;
      if (!resturantId) {
        return res.status(404).send({
          success: false,
          message: "No Resturant Found OR Provide Resturant ID",
        });
      }
      await resturantModel.findByIdAndDelete(resturantId);
      res.status(200).send({
        success: true,
        message: "Resturant Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Eror in delete resturant api",
        error,
      });
    }
  };

module.exports = {createRestaurentController,getAllRestaurentController,getByidRestaurentController,deleteResturantController}