    const userModel = require("../models/userModel");
    let mongoose = require("mongoose")

    const isValid = function(value){
      if(typeof value === 'undefined' || value === null) return false
      if(typeof value === 'String' && value.trim().length === 0) return 
      false
      if(typeof value === 'Number' && value.toString().trim().length === 0) return 
      false
      
      return true;
    }

    const isValidRequestBody = function(requestBody){
      return Object.keys(requestBody).length > 0
    }

    const isValidObjectid = function(ObjectId){
      return mongoose.Types.ObjectId.isValid(ObjectId)
    }

    const isValidTitle = function(title){
      return ['Mr','Mrs','Miss','Mist'].indexOf(title) !== -1
    }

    const createUser = async function (req, res) {
      try {
        let data = req.body;

        //checking if any user details is given by client
        if (!isValidRequestBody(data)) {
          return res
            .status(400)
            .send({ status: false, message: `please provide user details` });
        }

        //extracting parameters
        let {
          title,
          name,
          phone,
          email,
          password,
          address
        } = requestBody;
        
        if(!isValid(title)){
          return res.status(400).send({status:false, message: `Title is required`})
          
      }

        if(!isValidTitle(title)){
          return res.status(400).send({status:false, message: `Title should be among Mr, Mrs, Miss, and Mast`})
          
      }

        if(!isValid(name)){
          res.status(400).send({status:false, message:`Name is required`})
          return
      }
        if(!isValid(phone)){
          res.status(400).send({status:false, message: `phone number is required`})
          return
      }


        if (!/^[2-9]\d{10}$/.test(phone)) {
          return res.status(400).send({ status: false, msg: "Enter a valid phone number" })
        }

        // check for the mobile no already exist or not
        let existingMobile= await internModel.findOne({phone:phone});

        if(existingMobile){ 
          return res.status(400).send({status:false, msg:"Mobile Number already exist"})
        }


        if(!isValid(email)){
          res.status(400).send({status:false, message: `email is required`})
          return
        }

        if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
          return res.status(400).send({ status: false, msg: "Enter a valid email address" });
        }

        // check email value present in collection or not
        let ifEmailExist = await internModel.findOne({ email:email });
    
        if(ifEmailExist) return res.status(400).send({ status: false,
          msg: "Email already exists" });

        
        if(!isValid(password)){
          return res.status(400).send({status : false, msg : "Password is needed"})
        }

        if (!/^([a-zA-Z0-9!@#$%^&*_\-+=><]{8,16})$/.test(password.trim())) {
            return res
              .status(400)
              .send({ status: false, message: "Plz enter valid Password" });
      }
        
      if (Object.keys(address).length < 3) {
          return res
            .status(400)
            .send({ status: false, message: "address is required" });
      }      

        //street validator
        if(!isValid(street)){
          res.status(400).send({status:false, message:`street name is needed`})
          return
      }

        //city validator
        if(!isValid(city)){
          res.status(400).send({status:false, message:`city name is needed`})
          return
      }

        //pin validator
        if(!isValid(pin)){
          res.status(400).send({status:false, message:`pin is needed `})
          return
        }

        if (!/^([0-9]{6})$/.test(address.pincode)) {
          return res
            .status(400)
            .send({ status: false, message: "plz enter valid pincode" });
        }

        let userDetail = {
          title,
          name,
          phone,
          email,
          password,
          address}

        let newUser = await userModel.create(userDetail);
        return res.status(201).send({ status: true, message: "user created successfully", data:newUser });
      }
      catch (err) {
        res.status(500).send({ status: false, massege: err.message });
      }
    };

  const userLogin = async function (req, res) {
  try {
    const requestBody  = req.body

    if (!isValidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({ status: false, message: `please provide login details` });
    }

    let {email,password} = requestBody

    if(!isValid(email)){
      return res.status(400).send({status:false, message: `email is required`})
      
  }   


    if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
      return res
        .status(400)
        .send({ status: false, message: "plz enter the valid Email" });
    } 

    if(!isValid(password)){
      return res.status(400).send({status:false, message: `password is required`})      
  }

    if (
      !/^([a-zA-Z0-9!@#$%^&*_\-+=><]{8,16})$/.test(password)
    ) {
      return res
        .status(400)
        .send({ status: false, message: "Plz enter valid Password" });
    }

    let isUser = await userModel.findOne({email , password});

    if (!isUser) {
      return res
        .status(401)
        .send({ status: false, message: "no such user with these credentials" });
    }
    
    let token = jwt.sign(
      {
        UserId: isUser._id,
        iat:Math.floor(Date.now()/1000),
        exp:Math.floor(Date.now()/1000)+ 60*60*60
      },
      "project-3/group-37" , {expiresIn:'1h'}
    );
    return res
      .status(200)
      .send({ status: true, message: "User login Successful", data: {token } });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports.userLogin = userLogin;
module.exports.createUser = createUser;