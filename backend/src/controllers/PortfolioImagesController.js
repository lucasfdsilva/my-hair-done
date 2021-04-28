const knex = require("../database/knex");
const uploadPictures = require("../utils/uploadImagesS3");
const AWS = require('aws-sdk');
const S3 = new AWS.S3()

module.exports = {
  async index(req, res, next) {
    try {

      const connectDB = await knex.connect();
      const portfolioImages = await connectDB("portfolio_images");

      return res.json(portfolioImages);
    
    } catch (error) {
        next(error);
    }
  },

  async view(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Missing Portfolio Image ID" });
      }

      const connectDB = await knex.connect();
      const portfolioImage = await connectDB("portfolio_images").where({ id: id }).first();

      if (!portfolioImage) return res.status(400).json({ message: "No Portfolio Image Found" });

      return res.status(200).json({ portfolioImage : portfolioImage });

    } catch (error) {
        next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { postId } = req.body;
      const files = req.files.files;

      if (!postId) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      if (!files) {
        return res.status(400).json({ message: "At least 1 picture of your job is required..." });
      }

      const urls = await uploadPictures.uploadPictures(files);

      console.log(urls)

      const connectDB = await knex.connect();

      for(const url of urls){  
        const newPortfolioImage = await connectDB('portfolio_images').insert({
          post_id: postId, 
          url: url,        
        });
      }
      
      return res.status(201).json({ message: "Portfolio Images Created Successfully" });

    } catch (error) {
        next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id, postId, url } = req.body;

      if (!id || !postId || !url ) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const connectDB = await knex.connect();
      const portfolioImageFromDB = await connectDB("portfolio_images").where({ id: id }).first();

      if(!portfolioImageFromDB) return res.status(400).json({ message: "No Portfolio Image Found" });

      const updatedPortfolioImage = await connectDB('portfolio_images').where({ id: id }).update({ 
        post_id: postId, 
        url: url, 
      });

      return res.status(200).json({ message: 'Portfolio Image updated successfully' });

    } catch (error) {
        next(error);
    }
  },

  async delete(req, res, next) {
    try {

      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const connectDB = await knex.connect();
      const portfolioImageFromDB = await connectDB("portfolio_images").where({ id: id }).first();

      if(!portfolioImageFromDB) return res.status(400).json({ message: "No Portfolio Image Found" });

      const deletedPortfolioImage = await connectDB('portfolio_images').where({ id: id}).del();

      return res.status(200).json({ message: 'Portfolio Image deleted successfully' });

    } catch (error) {
        next(error);
    }
  },
};