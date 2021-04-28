const knex = require("../database/knex");

module.exports = {
  async index(req, res, next) {
    try {

      const connectDB = await knex.connect();
      const portfolioPostsNoImages = await connectDB("portfolio_posts")
         
      const portfolioPostsWithImages = [];

      for (const post of portfolioPostsNoImages) {
        const images = await connectDB("portfolio_images")
                              .where({ post_id: post.id })
                              .select("id", "url")

        const postWithImages = {
          id: post.id,
          user_id: post.user_id,
          title: post.title,
          description: post.description,
          tags: post.tags,
          featured: post.featured,
          created_at: post.created_at,
          updated_at: post.updated_at,
          images: images,
        }

        portfolioPostsWithImages.push(postWithImages)
      }

      return res.json({posts: portfolioPostsWithImages});
    
    } catch (error) {
        next(error);
    }
  },

  async getAllPostsForHairdresser(req, res, next) {
    try {
      const { hairdresserId } = req.params;

      if (!hairdresserId) {
        return res.status(400).json({ message: "Missing Hairdresser ID" });
      }

      const connectDB = await knex.connect();
      const portfolioPostsNoImages = await connectDB("portfolio_posts").where({ user_id: hairdresserId })

      const portfolioPostsWithImages = [];

      for (const post of portfolioPostsNoImages) {
        const images = await connectDB("portfolio_images")
                            .where({ post_id: post.id })
                            .select("id", "url")
                            .orderBy("updated_at", "desc");

        const postWithImages = {
          id: post.id,
          user_id: post.user_id,
          title: post.title,
          description: post.description,
          tags: post.tags,
          featured: post.featured,
          created_at: post.created_at,
          updated_at: post.updated_at,
          images: images,
        }

        portfolioPostsWithImages.push(postWithImages)
      }

      return res.json({posts: portfolioPostsWithImages});
    
    } catch (error) {
        next(error);
    }
  },

  async getFeaturedPostsForHairdresser(req, res, next) {
    try {
      const { hairdresserId } = req.params;

      if (!hairdresserId) {
        return res.status(400).json({ message: "Missing Hairdresser ID" });
      }

      const connectDB = await knex.connect();
      const portfolioPostsNoImages = await connectDB("portfolio_posts")
                                            .where({ user_id: hairdresserId })
                                            .andWhere({ featured: true })
                                            .orderBy("updated_at", "desc");


      const featuredPostsNoImages = portfolioPostsNoImages.slice(0, 4);

      const featuredPortfolioPostsWithImages = [];

      for (const post of featuredPostsNoImages) {
        const images = await connectDB("portfolio_images")
                            .where({ post_id: post.id })
                            .select("id", "url")

        const postWithImages = {
          id: post.id,
          user_id: post.user_id,
          title: post.title,
          description: post.description,
          tags: post.tags,
          featured: post.featured,
          created_at: post.created_at,
          updated_at: post.updated_at,
          images: images,
        }

        featuredPortfolioPostsWithImages.push(postWithImages)
      }

      return res.json({posts: featuredPortfolioPostsWithImages});
    
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

      const connectDB = await knex.connect();
      const portfolioPost = await connectDB("portfolio_posts").where({ id: id }).first();

      if (!portfolioPost) return res.status(400).json({ message: "No Portfolio Post Found" });

      return res.status(200).json({ portfolioPost : portfolioPost });

    } catch (error) {
        next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { userId, title, description, tags, featured } = req.body;

      if (!userId || !title || !description ) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const connectDB = await knex.connect();
      const newPortfolioPost = await connectDB('portfolio_posts').insert({
        user_id: userId, 
        title: title, 
        description: description, 
        featured: featured,
        tags: tags        
      });

      return res.status(201).json({ message: "Portfolio Post Created Successfully", portfolioPost: newPortfolioPost });

    } catch (error) {
        next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id, userId, title, description, tags, featured } = req.body;

      if (!id || !userId || !title || !description) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const connectDB = await knex.connect();
      const portfolioPostFromDB = await connectDB("portfolio_posts").where({ id: id }).first();

      if(!portfolioPostFromDB) return res.status(400).json({ message: "No Portfolio Post Found" });

      const updatedPortfolioPost = await connectDB('portfolio_posts').where({ id: id }).update({ 
        title: title, 
        description: description, 
        tags: tags ,
        featured: featured,
      });

      return res.status(200).json({ message: 'Portfolio Post updated successfully' });

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
      const portfolioPostFromDB = await connectDB("portfolio_posts").where({ id: id }).first();

      if(!portfolioPostFromDB) return res.status(400).json({ message: "No Portfolio Post Found" });

      const deletedPostImages = await connectDB('portfolio_images').where({ post_id: id}).del();

      const deletedPortfolioPost = await connectDB('portfolio_posts').where({ id: id}).del();

      return res.status(200).json({ message: 'Portfolio Post deleted successfully' });

    } catch (error) {
        next(error);
    }
  },
};