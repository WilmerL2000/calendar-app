const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
  } catch (error) {}
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
  } catch (error) {}
};

const revalidateToken = async (req, res) => {};

export { createUser, loginUser, revalidateToken };
