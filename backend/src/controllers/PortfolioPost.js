const knex = require("../database/knex");

module.exports = {
  async index(req, res, next) {
    try {
      const portfolioPosts = await knex("portfolio_posts");
      return res.json(portfolioPosts);
    } catch (error) {
        next(error);
    }
  },

  async view(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Missing Portfolio Post ID" });
      }

      const portfolioPost = await knex("portfolio_posts").where({ id: id }).first();

      if (!portfolioPost) return res.status(400).json({ message: "No Portfolio Post Found" });

      return res.status(200).json({ portfolioPost : portfolioPost });

    } catch (error) {
        next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { hairdresser_id, title, description, img_url, style, tags } = req.body;

      if (!hairdresser_id || !title || !description || !img_url || !style) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const newPortfolioPost = await knex('portfolio_posts').insert({
        hairdresser_id: hairdresser_id, 
        title: title, 
        description: description, 
        img_url: img_url,
        style: style, 
        tags: tags        
      });

      return res.status(201).json({ message: "Portfolio Post Created Successfully" });

    } catch (error) {
        next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id, hairdresser_id, title, description, img_url, style, tags } = req.body;

      if (!id || !hairdresser_id || !title || !description || !img_url || !style) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const portfolioPostFromDB = await knex("portfolio_posts").where({ id: id }).first();

      if(!portfolioPostFromDB) return res.status(400).json({ message: "No Portfolio Post Found" });

      const updatedPortfolioPost = await knex('portfolio_posts').where({ id: id }).update({ 
        title: title, 
        description: description, 
        img_url: img_url,
        style: style, 
        tags: tags 
      });

      return res.status(200).json({ message: 'Portfolio Post updated successfully'});

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

      const portfolioPostFromDB = await knex("portfolio_posts").where({ id: id }).first();

      if(!portfolioPostFromDB) return res.status(400).json({ message: "No Portfolio Post Found" });

      const deletedPortfolioPost = await knex('portfolio_posts').where({ id: id}).del();

      return res.status(200).json({ message: 'Portfolio Post deleted successfully' });

    } catch (error) {
        next(error);
    }
  },
};