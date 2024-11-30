// const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://new_user18:user123@cluster0.bazvvyc.mongodb.net/PaymentApp');

// //defining Schema for users

// const userSchema = new mongoose.Schema({
//     username:{
//         type:String,
//         required:true,
//         unique:true,
//         trim:true,
//         lowercase:true,
//         minLength:3,
//         maxLength:30
//     },
//     password:{
//         type:String,
//         required:true,
//         minLength:6
//     },
//     firstName:{
//         type:String,
//         required:true,
//         trim:true,
//         maxLength:50
//     },
//     lastName:{
//         type:String,
//         required:true,
//         trim:true,
//         maxLength:50
//     }
// });

// //defing Schema for account

// const accountSchema = new mongoose.Schema({
//     userId:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref:'User',
//         required:true
//     },
//     balance:{
//         type:Number,
//         required:true
//     }
// });

// //defing  Schema for transition history

// const transitionsSchema = new mongoose.Schema({
//     senderId:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref:'User',
//         required:true
//     },
//     reciverId:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref:'User',
//         required:true
//     },
//     amount:{
//         type:Number,
//         required:true
//     }
// });


// //creating model for userSchema
// const User = mongoose.model('User',userSchema);

// //creating model for accountSchema
// const Account = mongoose.model('Account',accountSchema);

// //
// const Transactions  = mongoose.model('Transactions',transitionsSchema);

// //export
// module.exports = {
//     User,
//     Account,
//     Transactions
// };
const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config');
const environment = process.env.NODE_ENV || 'development';
const configEnv = config[environment]; 
// Connect to MySQL Database
const sequelize = new Sequelize(configEnv.database, configEnv.username, configEnv.password, {
    host: configEnv.host,
    dialect: configEnv.dialect,
    port: configEnv.port,
    logging: configEnv.logging,  // You can disable logging or keep it as true
  });
// Check Database Connection
sequelize.authenticate()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error:', err));

// Define User Schema
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        trim: true,
        validate: { len: [3, 30] }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [6] }
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [1, 50] }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [1, 50] }
    }
});

// Define Account Schema
const Account = sequelize.define('Account', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: { min: 0 }
    }
});

// Define Transaction Schema
const Transaction = sequelize.define('Transaction', {
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: { min: 0.01 }
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

// Define Relationships
User.hasOne(Account, { foreignKey: 'userId' });
Account.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Transaction, { foreignKey: 'senderId' });
User.hasMany(Transaction, { foreignKey: 'receiverId' });
Transaction.belongsTo(User, { foreignKey: 'senderId' });
Transaction.belongsTo(User, { foreignKey: 'receiverId' });

// Sync Database
sequelize.sync({ force: true }) // Use force: false for production
    .then(() => console.log('Database synced successfully'))
    .catch(err => console.error('Database sync error:', err));

// Export Models
module.exports = {
    sequelize,
    User,
    Account,
    Transaction
};
