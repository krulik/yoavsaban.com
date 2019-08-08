let cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const CLIP = 'clip_m50wec';

cloudinary.uploader.explicit(CLIP, {
    resource_type: 'video',
    type: 'upload',
    eager_async: true,
    eager: [{
      width: 1024,
      crop: 'scale',
      video_codec: 'auto'
    }]},
    function(error, result) {
      console.log(result, error);
    }
);
