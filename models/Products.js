module.exports = (sequelize, DataTypes) => {
 const Products = sequelize.define(
  "Products",
  {
   id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
   },
   name: {
    type: DataTypes.STRING,
    allowNull: false,
   },
   brand: {
    type: DataTypes.STRING,
    allowNull: false,
   },
   price: {
    type: DataTypes.INTEGER,
    allowNull: false,
   },
   stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
   },
   createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
   },
   updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
   },
  },
  {
   tableName: "products",
  }
 );

 return Products;
};
