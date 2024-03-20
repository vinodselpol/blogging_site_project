import User from "../models/user.model.js";


//get all users
export const getAllUsers = async (req, res, next) => {
    try {
        // Use a regular expression with $not to exclude emails containing "@admin"
        const users = await User.find({
            email: { $not: /@admin/ }
        });

        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};


export const updateUser = async (req, res, next) => {
    const { email } = req.body;

    try {
        // Find the user by email to get the current 'disabled' state
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Toggle the 'disabled' value and save the updated document
        user.disabled = !user.disabled;
        await user.save();

        // Fetch and return all users after the update
        const users = await User.find({});
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

