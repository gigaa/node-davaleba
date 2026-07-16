const { isValidObjectId } = require("mongoose");
const postSchema = require("../../models/post.model");

async function PostPagination(req, res) {
  let { page = 1, take = 5 } = req.query;

  take > 5 ? (take = 5) : take;
  const findAllInfo = await postSchema
    .find({})
    .skip((page - 1) * take)
    .limit(take);
  res.json({ message: "finded all info successfully", data: findAllInfo });
}

async function getByIdPost(req, res) {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.json({ message: "imvalid id" });
  }

  const findUserByID = await postSchema.findById(id);

  res.json({ message: "finded successfully", data: findUserByID });
}

async function createPost(req, res) {
  const { title, tag, description } = req.body;
  console.log({ title, tag, description });
  if (
    !title ||
    typeof title !== "string" ||
    !tag ||
    typeof tag !== "string" ||
    !description ||
    typeof description !== "string"
  ) {
    return res.json({
      message:
        "title,title must be a string,tag and description is required field",
    });
  }

  const createPost = await postSchema.create({
    title,
    tag,
    description,
  });
  // console.log({ description });

  // console.log(createPost);

  res.json({ message: "created succesffuly", data: createPost });
}

async function updatePost(req, res) {
  const { id } = req.params;
  const { title, tag, description } = req.body;

  if (!isValidObjectId(id)) {
    return res.json({ message: "imvalid id" });
  }

  const findPostByIdAndUpdate = await postSchema.findByIdAndUpdate(
    id,
    { title, tag, description },
    { new: true },
  );
  res.json({ message: "udpated successfully", data: findPostByIdAndUpdate });
}

async function deletePost(req, res) {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.json({ message: "invalid mongo Id" });
  }
  const deletedPost = await postSchema.findByIdAndDelete(id);
  res.json({ message: "deleted successfully", data: deletedPost });
}

module.exports = {
  PostPagination,
  getByIdPost,
  createPost,
  deletePost,
  updatePost,
};
