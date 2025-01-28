const axios = require('axios');

const handleResponse = (res, status, message, data = null) => {
        res.status(status).json({
          status,
          message,
          data,
        });
      };

 const getReviews = async (request, res, next)  => {
        try{
      const reviews = await  axios.get("http://localhost:8084/reviews")
       .then(response => res.json(response.data));
      console.log("reviews" + reviews);
      handleResponse(res, 200, "reviews fetched successfully", reviews);
        }catch (err) {
                next(err);
                return;
              // console.log(error)
              }
};

 const createReviews = async (request, res, next)  => {
        const reviewName  = request.body.reviewName;
        const description  = request.body.description;
        try{
      const reviews = await  axios.post("http://localhost:8084/reviews", {
        reviewName: reviewName,
        description: description,
      },
)
       .then(response => res.json(response.data))
        .res.status(200).json({ data: response.data });
}
       catch(error) {
        //console.log(error);
        return;
      };
};

 const updateReview = async (req, res, next)  => {
    try{
        let postId = req.params.id;
        axios.put('http://localhost:8084/reviews'+ "/" + postId, req.body)
        .then(response => res.json(response.data))
        .res.status(200).json({ data: response.data });
      }catch (err) {
          console.log(err);
          return;
         // res.status(500).json({ msg: "request id is not present" });
        }
  };

 const getReviewById = async (req, res, next)  => {
    
        try {
                let postId = req.params.id;
                console.log("Making axios call with post id= " + postId);
                const response = await axios.get('http://localhost:8084/reviews' + "/" + postId);
                res.status(200).json({ data: response.data });
              } catch (err) {
                console.log(err);
                res.status(500).json({ msg: "NO REVIEW PRESENT WITH ID" });
              }
  };

   const deletereviewById = async (req, res, next)  => {
    
        try {
                let postId = req.params.id;
                console.log("Making axios call with post id= " + postId);
                const response = await axios.delete('http://localhost:8084/reviews' + "/" + postId);
                res.status(200).json({ data: response.data });
              } catch (err) {
                console.log(err);
                res.status(500).json({ msg: "NO REVIEW PRESENT WITH ID" });
              }
  };

  module.exports = {
    createReviews,
    updateReview,
    getReviews,
    getReviewById,
    deletereviewById
}