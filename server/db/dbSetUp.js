const mongoose = require('mongoose');
const UserSchema = require('../schemas/UserSchema.js')
const CartSchema = require('../schemas/CartSchema.js')
//Console.log()


exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected successfully to: ${mongoose.connection.name} `);
    } catch (error) {
        console.error(`${mongoose.connection.name} Connection error:`, error);
        process.exit(1);
    }
};

exports.closeDB = async () => {
    await mongoose.disconnect();
};

exports.createUsers = async () => {
    //Console.log(resetting users)
    await UserSchema.deleteMany({})
    //Console.log(populating users)
    UserSchema.insertMany([
        { userName: "Mama" },
        { userName: "Tata" },
        { userName: "Pepa" },
        { userName: "Franta" },
        { userName: "Honza" }
    ])
};

exports.createCarts = async () => {
    //Console.log(resetting carts)
    await CartSchema.deleteMany({})
    //Console.log(populating carts)
    const users = await UserSchema.find();
    //console.log(users);
    u_id = users.map((u) => {
        return u._id.toString();
    })

    CartSchema.insertMany([
        {
            name: "Pecivo",
            owner: u_id[0],
            memberList: [u_id[1], u_id[2], u_id[3], u_id[4]],
            resolved: false,
            itemList: [
                {
                    name: "Rohlik",
                    resolved: false,
                },
                {
                    name: "Chleba",
                    resolved: false,
                }
            ]
        },
        {
            name: "Zelenina",
            owner: u_id[0],
            memberList: [u_id[1], u_id[2], u_id[3], u_id[4]],
            resolved: false,
            itemList: [
                {
                    name: "Rajce",
                    resolved: false,
                },
                {
                    name: "Brambory",
                    resolved: false,
                },
                {
                    name: "Cuketa",
                    resolved: false,
                }
            ]
        },
        {
            name: "Sladkosti",
            owner: u_id[1],
            memberList: [u_id[2], u_id[3], u_id[4]],
            resolved: true,
            itemList: [
                {
                    name: "Zmrzlina",
                    resolved: false,
                },
                {
                    name: "Sorbet",
                    resolved: false,
                }
            ]
        },
        {
            name: "Zuby",
            owner: u_id[0],
            memberList: [u_id[2], u_id[3], u_id[4]],
            resolved: true,
            itemList: [
                {
                    name: "Colgate Big Kids´ Smiles zubní pasta 6-9 let",
                    resolved: false,
                },
                {
                    name: "Colgate® Ultra Soft Design Edition Smile Love Repeat",
                    resolved: false,
                }
            ]
        }
    ])

};
