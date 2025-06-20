import cloudinary from "../lib/cloudinary.js";
import User from "../models/auth.model.js";
import Message from "../models/message.model.js";

export const getUserForSidebarController = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessagesController = async (req, res) => {
  try {
    const { id: UserToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: UserToChatId },
        { senderId: UserToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessageController = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user_id;

    let imageUrl;
    if (image) {
      // Upload the image to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      receiverId,
      senderId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // todo: real-time fuctionality goes here => Socket.io

    res.status(200).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessageController:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
