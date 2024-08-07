import { Router } from "express";
import bcrypt from "bcrypt";
import { AdminUser, validate, validatePass } from "../models/admin.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await AdminUser.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already exists!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new AdminUser({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Password reset route
router.post("/:id/resetPassword", async (req, res) => {
  try {
    const { error } = validatePass(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const { password } = req.body;
    const user = await AdminUser.findById(req.params.id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
});

export default router;
