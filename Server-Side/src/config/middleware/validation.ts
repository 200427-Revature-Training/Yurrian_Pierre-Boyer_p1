
export function validation (req, res, next) {
    const { ersUsername, ersPassword } = req.body;

    function validName(ersUsername) {
        return /^[a-zA-Z0-9]+$/.test(ersUsername)
    }

    if (req.path === '/') {
      if (![ersUsername, ersPassword].every(Boolean)) {
        return res.json("Missing Credentials");
      } else if (!validName(ersUsername)) {
        return res.status(401).json("Invalid Username");
      }
    }

    next(); 
  };