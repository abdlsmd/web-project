
require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const session = require("express-session")
const passport = require("passport")
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const bcrypt = require('bcrypt')

//for image
const multer = require('multer');

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const UserModel = require('./models/Users')
const RegisterModel = require('./models/Register')
const EventModel = require('./models/Events')
const EventRegForm = require('./models/EventReg')
const GalleryModel = require('./models/Gallery')
const SocietyRegModel = require('./models/SocietyRegTable')
const ProfileModel = require('./models/ProfileData');
const { profileEnd } = require('console');

const clientid = "560335784129-02uhc6svidk0r2sg0gbku3080u2t1dqn.apps.googleusercontent.com"
const clientSecret = "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"


const app = express()
app.use(cors())
app.use(express.json());
app.use(express.static('uploads'))
app.use(express.static('CVuploads'))
app.use(express.static('Profileuploads'))


const uploadDir = path.join(__dirname, 'uploads');
const uploadCVDir = path.join(__dirname, 'CVuploads');
const uploadProfileDir = path.join(__dirname, 'Profileuploads');


if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true});
}

if(!fs.existsSync(uploadCVDir)){
    fs.mkdirSync(uploadCVDir, { recursive: true});
}

if(!fs.existsSync(uploadProfileDir)){
    fs.mkdirSync(uploadProfileDir, { recursive: true});
}


//setting up session
app.use(session({
    secret: "W7301@jqir#",
    resave: false,
    saveUninitialized: true
}))

//setting up passport
app.use(passport.initialize());
app.use(passport.session());


passport.use(
    new OAuth2Strategy({
        clientID: clientid,
        clientSecret: clientSecret,
        callbackURL: "http://localhost:3001/auth/google/callback",
        scope:["profile", "email"],
        passReqToCallback: true
    },
    async(request , accessToken, refreshToken, profile,done) => {
        console.log("profile",profile)
        try{

           console.log('Access Token:', accessToken);
           console.log('Refresh Token:', refreshToken);
           console.log('Profile:', profile);
           
          let user = await RegisterModel.findOne({id: profile._id})
          if (!user){
             user = new RegisterModel({
                id: profile._id,
                name: profile.name,
                email: profile.emails[0].value,
                role: profile.role,
                password: profile.password

             })

             await user.save();
          }
          return done(null, user)
        }catch(error){
           return done(error, null)
        }
    }
  )

)

passport.serializeUser((user, done) => {
     done(null,user);
})

passport.deserializeUser((user, done)=> {
    done(null, user);
})

//initialize google oauth login
app.get("/auth/google", passport.authenticate("google",{ scope: ["profile", "email"]}));

app.get("/auth/google/callback" , passport.authenticate("google", {
    successRedirect:"http://localhost:5173/home",
    failureRedirect:"http://localhost:5173/login"
}))

//connection with mongo db
mongoose.connect("mongodb+srv://AS:987654321@as.efrg6.mongodb.net/")
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

app.get('/', (req, res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})



//for image
app.use('/uploads', express.static('uploads'))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
   },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
   }
})

const upload = multer({storage: storage})


//for CVs
app.use('/uploadsCV', express.static('CVuploads'))

const  CVstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadCVDir)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})


const CVupload = multer({
    storage: CVstorage
})

//for ProfileImage
app.use('/Profileuploads', express.static('Profileuploads'))

const  ProfileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadProfileDir )
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const Profileuploads = multer({
    storage: ProfileStorage
})


app.post('/uploadCV', CVupload.single('CVimage'),(req, res) => {
    console.log(req.file);
    res.send('File uploaded successfully')
})

//Profiles data
app.post('/Profileuploads', Profileuploads.single('Profileimage'),(req, res) => {
    console.log(req.file);
    res.send('File uploaded successfully')
})

app.get('/Profile', async (req, res) => {
    try {
       const profiles = await ProfileModel.find({});
       res.json(profiles);

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profiles'})
    }
})

// app.get('/Profile', async (req, res) => {
//     try {
//        const {name, email} = req.query;
//        if(!name || !email){
//           return res.status(400).json({error: 'Name and email are required'})
//        }

//        const profile = await ProfileModel.findOne({ name, email});
//        if (!profile) {
//           return res.status(404).json({ error: 'Profile not found'});
//        }
//        res.json(profile);

//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch profiles'})
//     }
// })


app.get('/Profile/:id', (req, res) => {
    const id = req.params.id;

    try{
       const profile = ProfileModel.findById({_id: id})
       if(!profile){
          return res.status(404).json({ error: 'Profile not found'})
        }
        res.json(profile)
    } catch (err) {
       res.status(500).json({ error: 'Server error'})
    } 
})

app.put('/updateProfile/:id', Profileuploads.single('ProfilePic'), async (req, res) => {
    const id = req.params.id;

    try{
     const profile = await ProfileModel.findByIdAndUpdate({_id: id},
        {
            Name: req.body.Name, 
            Email: req.body.Email,
            ProfilePic: req.file ? req.file.filename : req.body.ProfilePic,
            Role: req.body.Role,
            Team: req.body.Team,
            phoneNum: req.body.phoneNum,
            Address: req.body.Address,
            DOB: req.body.DOB, 
            MStatus: req.body.MStatus,
            Res: req.body.Res,
           
        },
        { new : true}
    )
        
    if (!profile){
        return res.status(404).json({error: 'Profile not found'})
    }

    res.json(profile)

  
    }catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update profile'})
    }

})

app.delete('/deleteProfile/:id', (req, res) => {
    const id = req.params.id;

    ProfileModel.findByIdAndDelete({_id: id })
    .then(profile => res.json(profile))
    .catch(err => res.json(err))
})

app.post("/createProfile", Profileuploads.single('ProfilePic'), async (req, res) => {
    
    console.log('Request Body:' , req.body);
    console.log('Uploaded File:' , req.file);
    try{
    
    const {Name, Email,  Role, Team,
           phoneNum, Address, DOB, MStatus, 
           Res} = req.body;

    if(!Name || !Email){
        return res.status(404).json({ error: 'Name and Email are required'})
    }

    const newProfile = new ProfileModel({
        Name, Email,
        ProfilePic: req.file? req.file.filename:'',
        Role,Team ,phoneNum, Address, DOB, MStatus,
        Res
    })

    await newProfile.save();
    res.status(200).json(newProfile);

}catch(error){
    console.log("Error creating the profile", error)
    res.status(500).json({error: 'Failed to create profile'})
}
})



//SignUp
app.post('/register', (req, res) => {
    const {name, email, role, password} = req.body;
   
    RegisterModel.findOne({ email: email })
    .then(user => {
        if (user) {
           return  res.json("Already have an account")
        } else {

            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err){
                  return res.json(err)
                }

                RegisterModel.create({
                    name: name,
                    email: email,
                    role: role,
                    password: hashedPassword
                })
                .then(result =>{ 

                    ProfileModel.create({
                         name: name,
                         email: email,
                         role: role,
                    })
                    .then(profileResult => {
                        res.status(201).json({
                            message: "Account and Profile has been created",
                            profile: profileResult
                        })
                       
                    })
                    .catch(profileErr => {
                        res.status(500).json({
                            message: "Account created , but error creating profile",
                            error: profileErr
                        })
                        
                    })
                })
                .catch(err => res.json(err))
              })
            }
       
    }).catch( err => res.json(err))
})


//LogIn

app.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try{
      const user = await RegisterModel.findOne({ email: email })
    
      if(!user || !bcrypt.compareSync(password, user.password)){
        return res.status(401).json({message : "Invalid credentials"})
      }

      const profile = await ProfileModel.findOne({ userId:  user._id});
      
      res.json({
        message: 'success',
        role: user.role,
        profile: profile
      })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message})
    }
})




//Users
app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    
    UserModel.findById({_id: id })
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put('/updateUser/:id', (req, res) =>{
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id: id },
        {name: req.body.name,
         email: req.body.email,
         status: req.body.status,
         team: req.body.team,
         role: req.body.role,
         hiringStatus: req.body.hiringStatus
        })
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.delete( '/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post("/createUser", (req, res) => {
    UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

//Society
// app.post("/createSR", (req, res) => {
//     SocietyRegModel.create(req.body)
//     .then(society => res.json(society))
//     .catch(err => res.json(err))
// })

app.get('/getSocieties', (req, res) => {
    SocietyRegModel.find({})
    .then(society => res.json(society))
    .catch(err => res.json(err))
   
})

app.get('/getSocieties/:id', (req, res) => {
    const id = req.params.id;

    SocietyRegModel.findById({_id: id})
    .then(society => res.json(society))
    .catch(err => res.json(err))
   
})

app.put('/updateSR/:id', (req, res) => {
    const id = req.params.id;

    SocietyRegModel.findByIdAndUpdate({_id: id},
        {
            fname: req.body.fname,
            lname: req.body.lname,
            batch: req.body.batch,
            degree: req.body.degree,
            Rollnum: req.body.Rollnum,
            Contact: req.body.Contact,
            Team: req.body.Team,
            Role: req.body.Role,
            PastExp: req.body.PastExp,
            CVimage: req.body.CVimage,
            SelectionStatus: req.body.SelectionStatus
        }
    )
    .then(society => res.json(society))
    .catch(err => res.json(err))

})

app.delete('/deleteSR/:id', (req, res) => {
    const id = req.params.id;

    SocietyRegModel.findByIdAndDelete({_id: id })
    .then(society => res.json(society))
    .catch(err => res.json(err))
})

app.post("/createSR", CVupload.single('CVimage'), async (req, res) => {
    
    console.log('Request Body:' , req.body);
    console.log('Uploaded File:' , req.file);
    try{
    
    const {fname, lname, batch, degree, 
           Rollnum, Contact, Team,Role,  PastExp, 
           SelectionStatus} = req.body;

    const newSociety = new SocietyRegModel({
        fname, lname, batch, degree, 
        Rollnum, Contact, Team,Role,  PastExp, 
        CVimage: req.file? req.file.filename:'',
        SelectionStatus
    })

    await newSociety.save();
    res.status(200).json(newSociety);
}catch(error){
    console.log("Error creating the evnt", error)
    res.status(500).json({error: 'Failed to create society'})
}


    // SocietyRegModel.create({
    //     fname, 
    //     lname, 
    //     batch, 
    //     degree, 
    //     Rollnum, 
    //     Contact, 
    //     Team, 
    //     PastExp, 
    //     CVimage,
    //     SelectionStatus
    // })

    //  .then(result => res.status(201).json(result))
    //  .catch(err => res.status(500).json({ error: err.message }))
})

app.put('/updateSR/:id', CVupload.single('CVimage'), async (req, res) => {
    const id = req.params.id;
    const updateSocietyData = {
        fname: req.body.fname, 
        lname: req.body.lname,
        batch: req.body.batch, 
        degree: req.body.degree, 
        Rollnum: req.body.Rollnum, 
        Contact: req.body.Contact, 
        Team: req.body.Team, 
        PastExp: req.body.PastExp, 
        SelectionStatus: req.body.SelectionStatus
      }
      if(req.file){
        updateSocietyData.CVimage = req.file.filename;
      }
      SocietyRegModel.findByIdAndUpdate({_id: id}, updateSocietyData, {new: true})
      .then(society => res.json(society))
      .catch(err => res.json({error: 'Failed to update the society data', details:err}))

    })




//Events
app.get("/events", (req, res) => {
    EventModel.find(req.body)
    .then(events => res.json(events))
    .catch(err => res.json(err))
})

app.get('/getEvents/:id', (req, res) => {
      const id = req.params.id;
      EventModel.findById({_id: id })
      .then(events => res.json(events))
      .catch(err => res.json(err))
})

//post route to create a new event
app.post("/createEvent", upload.single('image') , async(req, res) => {
    try{
    const {name, description, organizer, date,
          endDate, time, address, venue, budget,
          status, 
          image, ApprovalStatus} = req.body;

    const newEvent = new EventModel({
        name, description, organizer, date,
          endDate, time, address, venue, budget,
          status, 
          image : req.file? req.file.filename:'',
          ApprovalStatus
    });
    await newEvent.save();
    res.status(200).json(newEvent);
    // EventModel.create(req.body)
    }catch(error){
    
       console.log("Error creating the event", error)
       res.status(500).json({error: 'Failed to create event'})
   }   
});

app.put('/updateEvents/:id',upload.single('image'), (req, res) =>{
    const id = req.params.id;
    const updateData ={
         name: req.body.name,
         description: req.body.description,
         organizer: req.body.organizer,
         date: req.body.date,
         endDate: req.body.endDate,
         time: req.body.time,
         address: req.body.address,
         venue: req.body.venue,
         budget: req.body.budget,
         status: req.body.status,
         //new addition
         ApprovalStatus: req.body.ApprovalStatus
        
        };
        if (req.file){
          updateData.image = req.file.filename;
        }
    EventModel.findByIdAndUpdate({_id: id}, updateData , {new: true})
        .then(event => res.json(event))
        .catch(err => res.json({error : 'Failed to update event', details:err}))
})

app.post('/EventRegForm', (req, res) => {
    const { fname, lname, batch, degree, rollnum} = req.body;
    EventRegForm.create({ fname, lname, batch, degree, rollnum })
    .then(event => res.json(event))
    .catch(err => res.json(err))
})

app.put('/EventRegForm/:id', (req, res) =>{
    const id = req.params.id;
    EventModel.findById({_id: id },
        console.log(id)
    )
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.delete('/deleteEvent/:id', (req, res) =>{
    const id = req.params.id;
    EventModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

//Pending Event 
app.get('/pendingEvents', async (req, res) => {
    try {
       const pendingEvents = await EventModel.find({ ApprovalStatus: false});
       res.json(pendingEvents);
    } catch (err) {
    res.status(500).json({error : err.message})
    }
})


// Event Approval/disapproval
app.patch('/approveEvents/:id', async (req, res) => {

    const { id } = req.params;
    const { approvalStatus} = req.body;
    try {
       const event = await EventModel.findByIdAndUpdate(id, { ApprovalStatus: approvalStatus}, {new: true});
       if(!event){
          return res.status(404).json({error : "Event not found"})
       }
       res.json(event);

    } catch (error) {
      res.status(500).json({error : error.message})
    }
})


//president images
//Gallery
app.post('/uploadImage',upload.array('file',80), (req, res) => {
    console.log(req.file)

    const imageFiles = req.files.map(
        file => ({ image: file.filename })
    )
    GalleryModel.insertMany(imageFiles)
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

app.get('/getImage', (req, res) => {
    GalleryModel.find()
    .then(images => res.json(images))
    .catch(err => res.json(err))
})

app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    console.log('Requested filename:', filename);
    const filePath = path.join(__dirname, 'uploads' , filename);
    console.log('File path:', filePath);

    res.download(filePath, (err) => {
        if(err){
            console.error('Dowload error:' , err)
            res.status(500).send('Error downloading the file')
        }
    })
})


app.get('/download-all-images', async (req, res) => {
    
    try{
        const images = await GalleryModel.find();

        if(images.length === 0){
            return res.status(404).send('No images found');
        }

        const archive = archiver('zip', {zlib: {level: 9}});
        res.setHeader('Content-disposition',
            'attachment; filename=images.zip'
        );
        res.setHeader('Content-type', 'application/zip');

        archive.pipe(res);

        for (const image of images){
            const filePath = path.join(uploadDir, image.image);
            archive.file(filePath, {name: image.image});
        }

        archive.finalize();

    }catch(err){
        console.error('Error creating ZIP file:' , err);
        res.status(500).send('Error creating ZIP file');

    }
    
})

//deleting image
app.delete('/deleteImage/:filename', (req, res) => {
    const filename = req.params.filename;

    GalleryModel.findOneAndDelete({image: filename})
    .then(result => {
        if (result) {
            const filePath = path.join(uploadDir , filename);
            fs.unlink(filePath, err => {
                if (err) {
                    console.error('Failed to delete', err);
                    res.status(500).json({error: "Failed to delete"})
                }else{
                    res.json({error: "Image deleted successfully"})
                }
            });
        }else{
            res.status(404).json({error: "Image not found in db"})
        }
})
.catch(err => res.status(500).
json({error: 'Failed to delete image', details: err}))
})





//listening port
app.listen(3001, ()=>{
    console.log("Server is running")
})

//Forget Password
app.post('/forget-password' , (req, res) => {
     const {email} = req.body;
     RegisterModel.findOne({email: email})
     .then(user => {
        if (!user){

            return res.send({Status: "User not existed"})
        }
        const token = jwt.sign({id: user._id}, "jwt_secret_key", {expiresIn: "1d"})
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:'audreyahmed246@gmail.com',
                pass: 'xnlw ycfk hqsc nzdc'
                // pass: 'ArwaAhmed1234'
            }
        });

        var mailOptions = {
            from: 'audreyahmed246@gmail.com',
            to: 'miraclemusif@gmail.com',
            subject: 'Reset your password',
            text: `http://localhost:5173/reset_password/${user._id}/${token}`
        }

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
                return res.send({Status: "Error", Error: error})
            }else{
                return res.send({Status: "Success"})
            }
        })
    
    })
    .catch(err => res.json(err));
})

app.post('/reset-password/:id/:token', async (req, res) => {
      const {id, token} = req.params
      const {password} = req.body

      jwt.verify(token, "jwt_secret_key", async (err, decoded) => {
          if(err){
              return res.json({Status: "Error with token"})
          }else{
            
            try{
                //hash new password
                const hashedPassword =  await bcrypt.hash(password, 10);
            
                await RegisterModel.findByIdAndUpdate(id, {password: hashedPassword})
                res.send({Status: "Success"})
            }catch(err){
                res.send({ Status: "Error", Error: err})

            }
            // .then(hash => {
            //     RegisterModel.findByIdAndUpdate({_id: id}, {password: hash})
            //     .then(u => res.send({Status: "Success"}))
            //     .catch(err => res.send({Status: err}))
            // })
            // .catch(err => res.send({Status: err}))
          }
      })
})