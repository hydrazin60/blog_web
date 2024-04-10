import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        "https://imgs.search.brave.com/iHaMYCc4eN-OP4OIF6ihB_NoCMJ46W8mH_BmxQYZzt8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vcGljanVt/Ym8uY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy9uYXR1cmUtbG92/ZXItZ3JlZW4taGVh/cnQtdHJlZS1mcmVl/LXBob3RvLmpwZz93/PTYwMCZxdWFsaXR5/PTgw",
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
